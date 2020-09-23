/**
 * 读取本地存储
 * @param {String} key
 */
export const get = (key: string) => {
  const value = localStorage.getItem(key)
  if (!value) return null
  return value.indexOf('{') === 0 || value.indexOf('[') === 0 ? JSON.parse(value) : value
}

/**
 * 本地存储
 * @param {String} key
 * @param {any} value
 */
export const save = (key: string, value: any) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value
  localStorage.setItem(key, data)
}

/**
 * 删除本地存储
 * @param {String} key
 */
export const remove = (key: string) => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}
