import * as TYPES from '@/store/types'
import { Action } from '@/store/types'
import { save } from '@/utils/storage'

let defaultState = {
  username: '',
  role: 0,
  userId: 0,
}

export default function UserReducer(state = defaultState, action: Action) {
  const { type, payload } = action
  switch (type) {
    case TYPES.USER_LOGIN:
      const { username, userId, role, token } = payload
      save('userinfo', { username, userId, role, token })
      return {
        ...state,
        username,
        userId,
        role,
        token,
      }
    default:
      return state
  }
}
