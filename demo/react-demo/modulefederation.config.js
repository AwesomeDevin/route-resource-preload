module.exports = {
  name: 'lingBaseLib',
  remotes: {
    ling_core: 'ling_core@//storage.360buyimg.com/mf.jd.com/ling_core/dist/remoteEntry.js',
  },
  shared: {
    react: {
      singleton: true,
      eager: true,
      requiredVersion: false,
    },
    'react-dom': {
      singleton: true,
      eager: true,
      requiredVersion: false,
    },
  },
}
