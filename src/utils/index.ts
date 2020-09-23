import marked, { MarkedOptions } from 'marked'
import xss from 'xss'

export const translateMarkdown = (plainText: string, isGuardXss: boolean = false) => {
  plainText = isGuardXss ? xss(plainText) : plainText
  const option: MarkedOptions = {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: true,
    smartLists: true,
    smartypants: true,
  }
  return marked(plainText, option)
}

// 获取 url query 参数
export const decodeQuery = (url: string) => {
  const params: {[key: string]: any} = {}
  const paramsStr = url.replace(/\.*\?/, '') // a=1&b=2&c=&d=xxx&e
  paramsStr.split('&').forEach((v) => {
    const d = v.split('=')
    if (d[1] && d[0]) {
      params[d[0]] = d[1]
    }
  })
  return params
}

// temp
export const formatDate = (time: string) => {
  return time.split('T')[0]
}