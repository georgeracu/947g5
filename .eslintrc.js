module.exports = {
  env: {
    "react-native/react-native": true
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