const express = require('express')
const {readFileSync} = require('fs');
const path = require('path')
const register = require('react-server-dom-webpack/node-register');
register();

const babelRegister = require('@babel/register')
babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [['@babel/preset-react', {runtime: 'automatic'}]],
  plugins: ['@babel/transform-modules-commonjs'],
});

const ListServerCom = require('../../components/List.server.js').default
const ScoreServerCom = require('../../components/Score.server.js').default
const React = require('react');
const { pipeToNodeWritable } = require('react-server-dom-webpack/writer')
const { getUserRank, getScoreByUser } = require('../../db.js')

const serverComponentRouter = express.Router()

serverComponentRouter.get('/', (req, res) => {
  res.send(
    readFileSync(
      path.resolve(__dirname, '../../dist/index.html'),
      'utf8'
    )
  )
})
serverComponentRouter.get('/list', async (req, res) => {
  await sleep(2000)
  // 访问数据库，获取数据传给组件
  const props = {listData: await getUserRank()}
  const manifest = readFileSync(
    path.resolve(__dirname, '../../dist/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);
  // 序列化服务端组件
  pipeToNodeWritable(
    React.createElement(ListServerCom, props),
    res,
    moduleMap
  );
})
serverComponentRouter.get('/score', async(req, res) => {
  await sleep(1000)
  const props = await getScoreByUser(req.query.userId)
  const manifest = readFileSync(
    path.resolve(__dirname, '../../dist/react-client-manifest.json'),
    'utf8'
  );
  const moduleMap = JSON.parse(manifest);
  // 序列化服务端组件
  pipeToNodeWritable(
    React.createElement(ScoreServerCom, props),
    res,
    moduleMap
  );
})


module.exports = serverComponentRouter

const sleep = (sec) => new Promise(res => setTimeout(res, sec))



