const RouteResourceManifest = require('@route-resource-preload/webpack-plugin')
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
            modulePreloadMap: {
              "/A": ["../components/A"]
            },
            mfPreloadMap: {
              "/MF": ["ling_core/Components"]
            },
            assetPreloadMap: {
              "/A": ['https://img20.360buyimg.com/img/jfs/t1/86699/27/29562/39551/62bec631E155c7e41/55d63c89279226f0.png']
            }
          })
        ]
      },
    }
  }
}