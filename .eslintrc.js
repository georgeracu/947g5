module.exports = {
  env: {
    'react-native/react-native': true,
    'jest': true
  },
  extends: [
    '@react-native-community',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    }
  },
  plugins: [
    'react',
    'react-native'
  ],
  rules: {
  },
};