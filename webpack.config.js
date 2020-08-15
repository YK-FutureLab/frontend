const path = require('path');
const webpack = require('webpack');

module.exports = env => ({
  name: 'freemarket', // 이 웹팩설정에 대한 이름. (선택적)
  mode: env.mode,
  devtool: env.mode === 'development' ? "source-map" : 'cheap-module-source-map', //디버깅을 위한 소스맵 제공
  resolve: {
    extensions: ['.jsx', '.js'], // 웹펙에서 처리할 파일 확장자 유형들
  },

  entry: {
    app: ['./src/index'],  // 웹팩할 대상에 해당되는 소스코드 파일. client파일에서 다른 소스코드를 import하면 웹팩에서 자동으로 인식하기 때문에 이것만 넣으면 된다
  },
  module: {
    rules: [{   // entry에 적용할 규칙들
      test: /\.jsx?$/,
      loader: 'babel-loader',  //js나 jsx파일에 대해서 babel을 적용한다. (JS를 일정 버젼 이하로 트랜스파일링하는 일을 한다)
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'], // 한국에서 점유율 1%이상
            },
            debug: true, // 웹팩 시, 타겟과 사용된 플러그인 및 버젼을 콘솔에 출력해줌 
          }],
          '@babel/preset-react',
        ],
        plugins: [],
      },
    }],
  },
  plugins: [],
  devServer: {
    contentBase: path.join(__dirname,'.'), //정적파일을 제공할 경로.
    publicPath: "/dist",  // 번들링 파일을 제공할 경로. (app.js라는 번들링 파일이 있다면, 이 파일은 {SERVER_ADDRESS}/dist/app.js 라는 경로에서 서빙될 것임.
    compress: true,
    port: 3000
    //historyApiFallback: true //404가 발생하면 index.html로 리다이렉트한다.
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  
  },
});