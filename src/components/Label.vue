<template>
  <vc-viewer @ready="readyPromise">
    <vc-imagery-provider>
      <vc-single-tile-imagery-provider url="/mapbox/{z}/{x}/{y}.jpg">
      </vc-single-tile-imagery-provider>
    </vc-imagery-provider>
  </vc-viewer>
</template>

<script>
import { VcViewer, VcImageryProvider, VcSingleTileImageryProvider } from 'vue-cesium'

export default {
  components: {
    VcViewer,
    VcImageryProvider,
    VcSingleTileImageryProvider
  },
  methods: {
    readyPromise (viewer) {
      // ... viewer is cesium viewer instance
    }
  }
}
</script>