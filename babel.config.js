module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-proposal-class-properties'],
    },
  },
};
