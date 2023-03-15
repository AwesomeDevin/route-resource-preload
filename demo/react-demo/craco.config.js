
const RouteResourceManifest = require('route-resource-preload/webpack-plugin')
const cracoModuleFederation = require('craco-module-federation')

module.exports = async function () {
  return {
    plugins: [
      {
        plugin: cracoModuleFederation,
        options: { useNamedChunkIds: true }, // THIS LINE IS OPTIONAL
      },
    ],
    
    webpack: {
      plugins: {
        add: [
          new RouteResourceManifest({
            modulePrefetchMap: {
              "/A": ["../components/A"]
            },
            mfPrefetchMap: {
              "/MF": ["ling_core/Components"]
            }
          })
        ]
      },
    }
  }
}