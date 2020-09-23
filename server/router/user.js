const Router = require('koa-router')
const { register, login } = require('../controllers/user')

const router = new Router({ prefix: '/user' })

router.post('/login', login).post('/register', register)

module.exports = router
