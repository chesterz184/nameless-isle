const { user: UserModel, article: ArticleModel, tag: TagModel, category: CategoryModel } = require('../models')
const fs = require('fs')
const { uploadPath, findOrCreateFilePath, decodeFile } = require('../utils/file')
const Joi = require('joi')
const { Op } = require('sequelize')

class ArticleController {
  static async create(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      authorId: Joi.number().required(),
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryName: Joi.string().required(),
      tagList: Joi.array(),
    })
    if (validator) {
      const { title, content, categoryName, tagList = [], authorId } = ctx.request.body
      /* category: [instance, created] */
      const category = await CategoryModel.findOrCreate({
        where: { name: categoryName },
      })
      const data = await ArticleModel.create({
        title,
        content,
        authorId,
        categoryId: category[0].id,
      })
      await data.addTags(tagList)
      ctx.body = {
        id: data.id,
      }
    }
  }
  static async findById(ctx) {
    const validator = ctx.validate(
      {
        ...ctx.params,
        ...ctx.query,
      },
      {
        id: Joi.number().required(),
        readCount: Joi.boolean(),
      }
    )
    if (validator) {
      const data = await ArticleModel.findOne({
        where: { id: ctx.params.id },
        include: [
          { model: TagModel, attributes: ['name'] },
          { model: CategoryModel, attributes: ['name'] },
        ],
      })
      const { readCount = true } = ctx.query
      if (readCount) {
        ArticleModel.update({ viewCount: ++data.viewCount }, { where: { id: ctx.params.id } })
      }
      ctx.body = {
        ...data,
      }
    }
  }
  static async getList(ctx) {
    const validator = ctx.validate(ctx.query, {
      page: Joi.string(),
      pageSize: Joi.number(),
      keyword: Joi.string().allow(''), // 关键字查询
      category: Joi.string(),
      tag: Joi.string(),
      order: Joi.string(),
    })
    if (validator) {
      const { page = 1, pageSize = 10, keyword = '', tag, category, order } = ctx.query
      const tagFilter = tag ? { name: tag } : null
      const categoryFilter = category ? { name: category } : null
      let articleOrder = [['createdAt', 'DESC']]
      if (order) {
        articleOrder = [order.split(' ')]
      }
      const data = await ArticleModel.findAndCountAll({
        where: {
          [Op.or]: {
            title: {
              [Op.like]: `%${keyword}%`,
            },
            content: {
              [Op.like]: `%${keyword}%`,
            },
          },
        },
        // include: [
        //   { model: TagModel, attributes: ['name'], where: tagFilter },
        //   { model: CategoryModel, attributes: ['name'], where: categoryFilter },
        // ],
        offset: (page - 1) * pageSize,
        limit: parseInt(pageSize),
        order: articleOrder,
      })

      ctx.body = { ...data }
    }
  }
  static async checkExist(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      fileNameList: Joi.array().required(),
    })

    if (validator) {
      const { fileNameList } = ctx.request.body
      const list = await Promise.all(
        fileNameList.map(async (fileName) => {
          const filePath = `${uploadPath}/${fileName}`
          const file = decodeFile(filePath)
          const title = file.title || fileName.replace(/\.md/, '')
          const article = await ArticleModel.findOne({ where: { title }, attributes: ['id'] })
          const result = { fileName, title }
          if (article) {
            result.exist = true
            result.articleId = article.id
          }
          return result
        })
      )
      ctx.body = list
    }
  }
  static async upload(ctx) {
    console.log(ctx.request)
    const file = ctx.request.files.file
    await findOrCreateFilePath(uploadPath)

    const upload = (file) => {
      const reader = fs.createReadStream(file.path)
      const fileName = file.name
      const filePath = `${uploadPath}/${fileName}`
      const upStream = fs.createWriteStream(filePath)
      reader.pipe(upStream)

      reader.on('end', function () {
        console.log('上传成功')
      })
    }
    Array.isArray(file) ? file.forEach((it) => upload(it)) : upload(file)
    ctx.body = {
      message: '上传成功'
    }
    ctx.status = 204
  }
  static async uploadConfirm(ctx) {
    const validator = ctx.validate(ctx.request.body, {
      authorId: Joi.number(),
      uploadList: Joi.array(),
    })
    if (validator) {
      const { uploadList, authorId } = ctx.request.body
      await findOrCreateFilePath(uploadPath)

      const _parseList = (list) => {
        return list.map((item) => {
          const filePath = `${uploadPath}/${item.fileName}`
          const result = decodeFile(filePath)
          const { content } = result
          const data = {
            title: item.fileName.replace(/\.md/, ''),
            categoryName: item.categoryName,
            // categories: categories.map((d) => ({ name: d })),
            // tags: tags.map((d) => ({ name: d })),
            content,
            authorId,
          }
          if (item.articleId) data.articleId = item.articleId
          return data
        })
      }

      const list = _parseList(uploadList)
      const updateList = list.filter((d) => !!d.articleId)
      const insertList = list.filter((d) => !d.articleId)
      // 插入文章
      const insertResultList = await Promise.all(
        insertList.map(async (data) => {
          const category = await CategoryModel.findOrCreate({
            where: { name: data.categoryName },
          })
          return ArticleModel.create({
            title: data.title,
            content: data.content,
            authorId: authorId,
            categoryId: category[0].id,
          })
        })
      )

      // const updateResultList = await Promise.all(
      //   updateList.map(async (data) => {
      //     const { title, content, categoryName, articleId } = data
      //     await ArticleModel.update({ title, content }, { where: { id: articleId } })
      //     await TagModel.destroy({ where: { articleId } })
      //     await TagModel.bulkCreate(tags)
      //     await CategoryModel.destroy({ where: { articleId } })
      //     await CategoryModel.bulkCreate(categories)
      //     return ArticleModel.findOne({ where: { id: articleId } })
      //   })
      // )

      ctx.body = { message: 'success', insertList: insertResultList }
    }
  }
}

module.exports = ArticleController
