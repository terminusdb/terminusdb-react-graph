const path = require('path');
const Dotenv = require('dotenv-webpack');
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
            use: ['style-loader', 'css-loader'],
          }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'terminus-graph.min.js',
        sourceMapFilename: 'terminus-graph.min.js.map',
        libraryTarget: 'umd',
        library: 'TerminusGraph',
    },
    plugins:[
      new Dotenv()
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
