const RouteResourcePreloadPlugin = require('@route-resource-preload/webpack-plugin')
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
          new RouteResourcePreloadPlugin({
            modulePreloadMap: {
              "/A": ["../components/A",'antd/es/modal']
            },
            mfPreloadMap: {
              "/MF": ["ling_core/Components"]
            },
            assetPreloadMap: {
              "/A": ['https://img14.360buyimg.com/ling/s516x0_jfs/t1/97522/12/25179/1393762/622aa4c9E4ff1c9d2/3de6b0ab3c754b8d.png']
            },
          })
        ]
      },
    }
  }
}