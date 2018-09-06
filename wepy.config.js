var prod = process.env.NODE_ENV === 'production'

const cssnext = require('cssnext');

module.exports = {
  wpyExt: '.wpy',
  eslint: false,
  cliLogs: true,
  compilers: {
    // less: {
    //   compress: true
    // },
    postcss: {
        plugins: [
            cssnext({
                browsers:['iOS 9', 'Android 4.4']
            })
        ]
    },
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'babel-plugin-transform-class-properties',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {

  module.exports.cliLogs = false;

  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  module.exports.compilers['postcss'] = {
      plugins: [
          cssnext({
              browsers:['iOS 9', 'Android 4.4']
          })
      ]
  }

  // 压缩less
  // module.exports.compilers['less'] = {
  //   compress: true
  // }

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
