const { user: UserModel } = require('../models')
const Joi = require('joi')
const { createToken } = require('../utils/token')
const { comparePassword, encrypt } = require('../utils/bcrypt')

class UserController {
  /* 注册 */
  static async register(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      username: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    })

    if (validator) {
      const { username, password, email } = ctx.request.body
      const result = await UserModel.findOne({ where: { email } })
      if (result) {
        ctx.throw(403, '邮箱已被注册')
      } else {
        const user = await UserModel.findOne({ where: { username } })
        if (user && !user.github) {
          ctx.throw(403, '用户名已被占用')
        } else {
          const saltPassword = await encrypt(password)
          await UserModel.create({ username, password: saltPassword, email })
          ctx.status = 204
          ctx.body = {
            message: '注册成功',
            username
          }
        }
      }
    }
  }

  static async login(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      username: Joi.string().required(),
      password: Joi.string().required()
    })
    if(validator) {
      const { username, password } = ctx.request.body
      const user = await UserModel.findOne({
        where: {
          username
        }
      })
      if(user) {
        const isMatch = await comparePassword(password, user.password)
        if(isMatch) {
          // token
          const { id, role } = user
          const token = createToken({ username: user.username, id })
          ctx.body = {
            username: user.username,
            role,
            id,
            token
          }
          // ctx.success({
          //   username: user.username,
          //   role,
          //   id,
          //   token
          // })
        } else {
          ctx.throw(403, '密码错误')
          // ctx.fail('4012', '密码错误')
        }
      } else {
        ctx.throw(403, '用户不存在')
        // ctx.fail('4011', '用户不存在')
      }

    }
  }
}

module.exports = UserController