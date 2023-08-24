module.exports = {
  name: 'lingBaseLib',
  remotes: {
    ling_core: 'ling_core@//storage.jd.com/mf-test.jd.com/ling_core/1.0.4/dist/remoteEntry.js',
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
