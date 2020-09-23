import * as TYPES from '@/store/types'
import request from '@/utils/request'
import { Dispatch } from 'redux'

interface loginParam {
  username: string
  password: string
}

interface regsiterParam {
  username: string
  password: string
  email: string
}

export const register = (params: regsiterParam) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      url: '/user/register',
      method: 'post',
      data: params,
    })
    dispatch({
      type: TYPES.USER_REGISTER,
      payload: res,
    })
    return Promise.resolve(res)
  }
}

export const login = (params: loginParam) => {
  return async (dispatch: Dispatch) => {
    const res = await request({
      url: '/user/login',
      method: 'post',
      data: params,
    })
    dispatch({
      type: TYPES.USER_LOGIN,
      payload: res,
    })
    return Promise.resolve(res)
  }
}
