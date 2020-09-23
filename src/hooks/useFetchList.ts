import { useEffect, useState, useCallback } from 'react'
import request from '@/utils/request'

import { useLocation, useHistory } from 'react-router-dom'
import { decodeQuery } from '@/utils'

interface LooseObject {
  [key: string]: any
}

interface FetchParams {
  requestUrl: string
  queryParams: LooseObject
  withLoading?: boolean
  fetchDependence: string[]
}
/**
 * fetchList
 * requestUrl 请求地址
 * queryParams 请求参数
 * withLoading 是否携带 loading
 * fetchDependence 依赖 => 可以根据地址栏解析拉取列表
 */
function useFetchList({ requestUrl = '', queryParams = {}, withLoading = true, fetchDependence = [] }: FetchParams) {
  const [dataList, setDataList] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 })

  const location = useLocation()
  const history = useHistory()

  const onFetch = useCallback(
    (params) => {
      withLoading && setLoading(true)
      fetchDataList(params)
    },
    [queryParams]
  )

  const handlePageChange = useCallback(
    (page) => {
      // return
      const search = location.search.includes('page=') ? location.search.replace(/(page=)(\d+)/, `$1${page}`) : `?page=${page}`
      const jumpUrl = location.pathname + search

      history.push(jumpUrl)
    },
    [queryParams, location.pathname]
  )

  useEffect(() => {
    if (fetchDependence.length === 0) {
      fetchWithLoading()
    }
  }, [])

  useEffect(() => {
    console.log('useEffect')
    if (fetchDependence.length > 0) {
      const params = decodeQuery(location.search)
      fetchWithLoading(params)
    }
  }, fetchDependence)

  function fetchWithLoading(params: LooseObject = {}) {
    withLoading && setLoading(true)
    fetchDataList(params)
  }

  function fetchDataList(params: LooseObject) {
    const requestParams = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...queryParams,
      ...params,
    }

    request
      .get(requestUrl, { params: requestParams })
      .then((response: LooseObject) => {
        pagination.total = response.count
        pagination.current = requestParams.page
        pagination.pageSize = requestParams.pageSize
        setPagination({ ...pagination })
        setDataList(response.rows)
        withLoading && setLoading(false)
      })
      .catch((e) => withLoading && setLoading(false))
  }

  return {
    dataList,
    loading,
    pagination: {
      ...pagination,
      onChange: handlePageChange,
    },
    onFetch,
  }
}

export default useFetchList