import React, { useState } from 'react'
import './index.styl'
import { RouteComponentProps } from 'react-router-dom'
import useFetchList from '@/hooks/useFetchList'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { decodeQuery } from '@/utils'
import ArticleList from '@/components/ArticleList'
import request from '@/utils/request'

function Home(props: RouteComponentProps) {
  const userInfo = useSelector((state: RootState) => state.user)
  const { dataList } = useFetchList({
    requestUrl: '/article/list',
    queryParams: { pageSize: 10 },
    fetchDependence: [props.location.search],
  })
  const [fileList, setFileList] = useState<File[]>([])

  const { keyword } = decodeQuery(props.location.search)

  const onHandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
      const file = event.target.files[0]
      setFileList([file])
      let data = new FormData()
      data.append('file', file)
      request('/article/upload', {
        method: 'post',
        data,
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8',
        },
      }).then(res => {
        console.log(res)
      })
    }
  }

  const confirmUpload = () => {
    let uploadList = fileList.map(file => {
      return {
        fileName: file.name,
        categoryName: '技术'
      }
    })
    request('/article/upload/confirm', {
      method: 'post',
      data: {
        authorId: userInfo.userId,
        uploadList
      }
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <div className="home-container">
      <div className="banner">
        <h1 className="home-title">NAMELESS ISLE</h1>
        <p className="home-intro">Sing For Me</p>
      </div>
      <div className="home-content">
        {userInfo.role === 0 && (
          <div className="upload-container">
            <input className="btn-post" type="file" name="article" accept="text/markdown" onChange={(event) => onHandleFileChange(event)}/>
            <button className="btn-post" onClick={() => confirmUpload()}>CONFIRM</button>

          </div>
        )}
        <ArticleList list={dataList}></ArticleList>
      </div>
    </div>
  )
}

export default Home
