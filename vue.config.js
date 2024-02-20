const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/manage-attendance/" : "/",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        sassOptions: {
          indentedSyntax: false,
        },
      },
    },
  },
});
