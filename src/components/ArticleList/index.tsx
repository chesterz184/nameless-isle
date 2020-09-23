import React from 'react'
import './index.styl'
import { formatDate, translateMarkdown } from '@/utils'

interface Article {
  id: number
  title: string
  content: string,
  viewCount: number,
  createdAt: string,
  updatedAt: string,
  authorId: number,
  categoryId: number
}

interface ArticleList {
  list: Article[]
}

function ArticleList(props: ArticleList) {
  const { list } = props

  return (
    <ul className="article-list">
      {
        list.map(article => (
          <li className="article-item" key={article.id}>
            <h3 className="title">
              {article.title}<span className="time">{formatDate(article.createdAt)}</span>
              </h3>
            <p className="content" dangerouslySetInnerHTML={{ __html: translateMarkdown(article.content)}}></p>
          </li>
        ))
      }
    </ul>
  )
}

export default ArticleList