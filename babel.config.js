module.exports = {
  presets: [["@babel/preset-env", { modules: false }]],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
