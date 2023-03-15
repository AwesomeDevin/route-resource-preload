module.exports = {
  name: 'lingBaseLib',
  remotes: {
    ling_core: 'ling_core@//mf.jd.com/resource/ling_core/dist/remoteEntry.js',
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
