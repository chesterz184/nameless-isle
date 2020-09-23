const Koa = require('koa')
const koaBody = require('koa-body')
// const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const db = require('./models')
const router = require('./router')
const error = require('koa-json-error')

const app = new Koa()

const context = require('./utils/context')
Object.keys(context).forEach((key) => {
  app.context[key] = context[key] // 绑定上下文对象
})

app
  .use(cors())
  .use(
    koaBody({
      multipart: true,
      formidable: {
        // uploadDir: path.resolve(__dirname, './upload'),
        keepExtensions: true, // 保持文件的后缀
        maxFileSize: 2000 * 1024 * 1024 // 设置上传文件大小最大限制，默认20M
      }
    })
  )
  .use(
    error({
      postFormat: (e, { stack, ...rest }) => (process.env.NODE_ENV !== 'development' ? rest : { stack, ...rest }),
    })
  )
router(app)

app.listen(3001, () => {
  db.sequelize
    .sync({
      force: false,
    })
    .then(async () => {
      console.log('sequelize connect success')
    })
    .catch((err) => {
      console.log(err)
    })
})
