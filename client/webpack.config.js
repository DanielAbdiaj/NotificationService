export default {
    entry: "./index.js",
    mode: "production",
    output: {
      filename: "bundle.js",
      library: {
        name: 'notifications',
        type: 'var',
      },
    },
    module:{
      rules:[
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
  };