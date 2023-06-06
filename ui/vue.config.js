const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
}, {
  "jest": {
    "moduleFileExtensions": ["js", "json", "vue"],
    "transform": {
      "^.+\\.js$": "babel-jest",
      "^.+\\.vue$": "@vue/vue3-jest"
    }
  }
})
