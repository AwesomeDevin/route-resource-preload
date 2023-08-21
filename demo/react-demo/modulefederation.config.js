module.exports = {
  name: 'lingBaseLib',
  remotes: {
    ling_core: 'ling_core@//mf.jd.com/resource-test/ling_core/dist/remoteEntry.js',
    ling_biz: 'ling_biz@//storage.jd.com/mf.jd.com/ling_biz/1.0.4/dist/remoteEntry.js',

  },
  shared: {
    react: {
      singleton: true,
      // eager: true,
      requiredVersion: false,
    },
    'react-dom': {
      singleton: true,
      // eager: true,
      requiredVersion: false,
    },
  },
}
