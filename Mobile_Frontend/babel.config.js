module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            '@components': './Frontend_Components',
            '@pages': './Pages',
            '@store': './store',
            '@utils': './utils',
            '@data': './data',
            '@lib': './lib',
          },
        },
      ],
    ],
  };
};