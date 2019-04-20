// This file bundles our JS and takes the SCSS and converts it into bundle.css followed the instructions here: https://material.io/develop/web/docs/getting-started/

const autoprefixer = require('autoprefixer')
const path = require('path')

function tryResolve_ (url, sourceFilename) {
  // Put require.resolve in a try/catch to avoid node-sass failing with cryptic libsass errors
  // when the importer throws
  try {
    return require.resolve(url, { paths: [path.dirname(sourceFilename)] })
  } catch (e) {
    return ''
  }
}

function tryResolveScss (url, sourceFilename) {
  // Support omission of .scss and leading _
  const normalizedUrl = url.endsWith('.scss') ? url : `${url}.scss`
  return tryResolve_(normalizedUrl, sourceFilename) ||
    tryResolve_(path.join(path.dirname(normalizedUrl), `_${path.basename(normalizedUrl)}`),
      sourceFilename)
}

function materialImporter (url, prev) {
  if (url.startsWith('@material')) {
    const resolved = tryResolveScss(url, prev)
    return { file: resolved || url }
  }
  return { file: url }
}

module.exports = {
  // Bundles the JS and Scss
  entry: ['./core/static/css/app.scss', './core/static/JavaScript/main.js'],
  output: {
    filename: './core/static/build/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './core/static/build/bundle.css'
            }
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          { loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
              importer: materialImporter
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
