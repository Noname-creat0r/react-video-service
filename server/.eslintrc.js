module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'standard',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 1 }]
  }
}
