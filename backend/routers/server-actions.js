const express = require('express')
const { register, getUser } = require('../db')

const serverActionRouter = express.Router()

serverActionRouter.get('/form', (req, res) => {
  res.render(
    'form.html',
    (err, html) => {
      res.send(html)
    }
  )
})
serverActionRouter.post('/add-user', async (req, res) => {
  const { username, password } = req.body
  // 修改数据库
  await register(username, password)
  res.redirect(
    `/action/register-result?username=${username}`
  )
})
serverActionRouter.get('/register-result', async(req, res) => {
  const user = await getUser(req.query.username)
  res.render(
    'form-result.html',
    {
      username: user.username,
      password: user.password
    },
     (err, html) => res.send(html)
    )
})

module.exports = serverActionRouter