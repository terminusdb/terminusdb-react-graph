const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
console.log("____WEB_PACK__");
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: "babel-loader",
                },
            },
            {
            // Transform our own .css files with PostCSS and CSS-modules
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                 'style-loader',
                   'css-loader'],
          },
          {
          test: /\.(svg|jpg|gif|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: (url, resourcePath, context) => {
                  console.log("___MODE__",argv.mode)
                  if(argv.mode === 'development') {
                    const relativePath = path.relative(context, resourcePath);

                     console.log("___CONTEXT__",context,resourcePath,relativePath)

                    return `/${relativePath}`;
                  }
                  return `/assets/${path.basename(resourcePath)}`;
                }
              }
            }
        ]}
      ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'terminusdb-graph.min.js',
        sourceMapFilename: 'terminusdb-graph.min.js.map',
        libraryTarget: 'umd',
        library: 'TerminusDBGraph',
    },
    plugins:[
      new Dotenv(),
      new CopyWebpackPlugin([
            {
                //Wildcard is specified hence will copy only css files
                from: 'src/css/main.css', //Will resolve to RepoDir/src/css and all *.css files from this directory
                to: '../es6/css/main.css'//Copies all matched css files from above dest to es6 folder
            }
        ])
    ],
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types',
      }
  },
};
