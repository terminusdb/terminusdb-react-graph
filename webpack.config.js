const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = (env, argv) => ({
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
                  //console.log("___MODE__",argv.mode)
                  if(argv.mode === 'development') {
                    const relativePath = path.relative(context, resourcePath);

                     //console.log("___CONTEXT__",context,resourcePath,relativePath)

                    return `/${relativePath}`;
                  }
                  return `/assets/${path.basename(resourcePath)}`;
                }
              }
            }
        ]}
      ]
    },
    devtool: argv.mode === 'production' ? false : '#inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'terminusdb-react-graph.min.js',
        sourceMapFilename: 'terminusdb-react-graph.min.js.map',
        library: 'TerminusDBGraph',
    },
    plugins:[
      new Dotenv(),
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
    target: 'node'
});
