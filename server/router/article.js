const Router = require('koa-router')
const { create, findById, getList, upload, uploadConfirm } = require('../controllers/article')

const router = new Router({ prefix: '/article' })

router
  .post('/', create)
  .get('/list', getList)
  .get('/:id', findById)
  .post('/upload', upload)
  .post('/upload/confirm', uploadConfirm)
module.exports = router
