export const USER_LOGIN = 'USER_LOGIN'
export const USER_REGISTER = 'USER_REGISTER'
export const USER_LOGIN_OUT = 'USER_LOGIN_OUT'

export interface Action {
  type: string,
  payload: any
}