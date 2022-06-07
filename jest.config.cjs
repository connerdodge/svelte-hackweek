module.exports = {
  transform: {
    '^.+\\.svelte$': ['svelte-jester', {
      'preprocess': './svelte.config.js'
    }],
    '^.+\\.[tj]s$': 'babel-jest',
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
}