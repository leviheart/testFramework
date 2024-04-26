<template>
  <canvas ref="canvas" width="500" height="500"></canvas>
</template>

<script>
const vert = `
  attribute vec4 a_position;
  void main () {
    gl_Position = a_position;
  }
`;

const fragPrefix = `
  precision mediump float;

  uniform float iTime;
  uniform vec2 iResolution;
`;

const fragTail = `
  void main () {
    gl_FragColor = mainImage(gl_FragCoord.xy);
  }
`;
const frag =
  fragPrefix +
  `#define NUM_LAYERS 5.

mat2 Rot(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

float Star(vec2 uv, float flare) {
    float d = length(uv);
    float m = 0.04 / d;
    float r = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += r * flare;
    uv *= Rot(3.1415 / 4.);
    float r2 = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += r2 * 0.3 * flare;
    return m * smoothstep(1.0, 0.2, d);
}

float Hash21(vec2 p) {
    p = fract(p * vec2(123.45, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

vec3 Layer(vec2 uv) {
    vec3 col = vec3(0);

    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 offs = vec2(x, y);
            float n = Hash21(id + offs);
            float size = fract(n * 345.34);
            float star = Star(gv - offs - vec2(n - 0.5, fract(n * 34.) - 0.5), smoothstep(.9, 0.99, size));
            vec3 color = sin(vec3(.2, .5, .9) * fract(n * 2345.2) * 6.28) * .5 + .5;
            color *= vec3(0.3 + size * 0.2, 0.5, 0.5 + size * 1.5);
            col += star * color * size;
        }
    }
    // if(gv.x > 0.48 || gv.y > 0.48) {
    //     col = vec3(1.0, 0.0, 1.0);
    // }
    return col;
}

  vec4 mainImage(vec2 fragCoord) {
    vec2 uv = (fragCoord.xy - .5 * iResolution.xy) / iResolution.y;
    vec3 col = vec3(0.0);
    float t = iTime * 0.001;
    vec2 M = (-0.5 * iResolution.xy) / iResolution.y;
    M *= 5.0;
    M *= Rot(t);
    uv *= Rot(t);
    for(float i = 0.0; i < 1.0; i += 1. / NUM_LAYERS) {
        float depth = fract(i + t);
        float fade = smoothstep(0.0, 0.3, depth) * smoothstep(1.0, 0.9, depth);
        float scale = mix(20., .5, depth);
        col += Layer(uv * scale + i * 435.32 - M) * fade;
    }

    return vec4(col, 1.0);
  }
` +
  fragTail;

/**
 * @param gl {WebGLRenderingContext}
 * @param vert {string}
 * @param frag {string}
 */
function initWebGL(gl, vert, frag) {
  const vertShader = gl.createShader(gl.VERTEX_SHADER);
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertShader, vert);
  gl.shaderSource(fragShader, frag);
  gl.compileShader(vertShader);
  let sucecess = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);
  if (!sucecess) {
    console.error(gl.getShaderInfoLog(vertShader));
    gl.deleteShader(vertShader);
    return;
  }

  gl.compileShader(fragShader);
  sucecess = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
  if (!sucecess) {
    console.error(gl.getShaderInfoLog(fragShader));
    gl.deleteShader(fragShader);
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  sucecess = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!sucecess) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }
  return program;
}

export default {
  name: "App",
  mounted() {
    const canvas = this.$refs.canvas;
    /**
     * @type WebGLRenderingContext
     */
    const gl = canvas.getContext("webgl");

    const program = initWebGL(gl, vert, frag);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const buffer = gl.createBuffer();
    const indicesBuffer = gl.createBuffer();
    const vertices = new Float32Array([
      -1.0,
      -1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
    ]);

    const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.useProgram(program);
    const a_position = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(
      a_position,
      2,
      gl.FLOAT,
      false,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(a_position);

    const iTime = gl.getUniformLocation(program, "iTime");
    const iResolution = gl.getUniformLocation(program, "iResolution");

    let time = 0;
    const mainLoop = () => {
      time++;

      gl.uniform1f(iTime, time);
      gl.uniform2f(iResolution, canvas.width, canvas.height);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

      requestAnimationFrame(mainLoop);
    };

    mainLoop();
  },
};
</script>
