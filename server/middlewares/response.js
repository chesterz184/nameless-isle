function response(option = {}) {
  return async (ctx, next) => {
    ctx.success = data => {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: option.code || '0',
        msg: option.msg || 'success',
        data
      }
    }

    ctx.fail = (code, msg) => {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || '-1',
        msg: msg || 'fail'
      }
    }

    await next()
  }
}

module.exports = response