// dependencies
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Autoprefixer = require('autoprefixer')
const PostCssImport = require('postcss-import')
// enviroment
const isDevelopment = process.env.NODE_ENV !== 'production'

function rules(type) {
  const rule = [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true
        }
      }
    },
    {
      test: /\.(eot|otf|ttf|woff|woff2)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/fonts/'
      }
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/images/'
      }
    },
    {
      test: /\.(csv|tsv)$/,
      loader: 'csv-loader'
    },
    {
      test: /\.xml$/,
      loader: 'xml-loader'
    }
  ]

  if (!isDevelopment || type === 'server') {
    rule.push(
      {
        test: /\.css$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]_[hash:base64]',
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                new PostCssImport({ root: loader.resourcePath }),
                new Autoprefixer({
                  grid: true
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /[\\/]node_modules[\\/]/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              localIdentName: '[name]__[local]_[hash:base64]',
              importLoaders: 2,
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]_[hash:base64]',
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                new PostCssImport({ root: loader.resourcePath }),
                new Autoprefixer({
                  grid: true
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /[\\/]src\/app\/components[\\/]/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              localIdentName: '[name]__[local]_[hash:base64]',
              import: true,
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                new PostCssImport({ root: loader.resourcePath }),
                new Autoprefixer({
                  grid: true
                })
              ]
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.less$/,
        include: /[\\/]src\/app\/components[\\/]/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]_[hash:base64]',
              import: true,
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                new PostCssImport({ root: loader.resourcePath }),
                new Autoprefixer({
                  grid: true
                })
              ]
            }
          },
          'less-loader'
        ]
      }
    )
  } else {
    rule.push(
      {
        test: /\.css$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]_[hash:base64]',
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                new PostCssImport({ root: loader.resourcePath }),
                new Autoprefixer({
                  grid: true
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /[\\/]node_modules[\\/]/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              localIdentName: '[name]__[local]_[hash:base64]',
              importLoaders: 2,
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]_[hash:base64]',
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                new PostCssImport({ root: loader.resourcePath }),
                new Autoprefixer({
                  grid: true
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: /[\\/]src\/app\/components[\\/]/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              localIdentName: '[name]__[local]_[hash:base64]',
              import: true,
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                new PostCssImport({ root: loader.resourcePath }),
                new Autoprefixer({
                  grid: true
                })
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname, 'src')]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: /[\\/]src\/app\/components[\\/]/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]_[hash:base64]',
              import: true,
              importLoaders: 2,
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                new PostCssImport({ root: loader.resourcePath }),
                new Autoprefixer({
                  grid: true
                })
              ]
            }
          },
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname, 'src')]
            }
          }
        ]
      }
    )
  }

  return rule
}

module.exports = rules
