import React, { ChangeEvent, useState } from 'react'
import ReactDOM from 'react-dom'
import './index.styl'
import Wrapper from '@/components/Wrapper'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { login, register } from '@/store/user/action'
import { RootState } from '@/store/rootReducer'
import { AnyAction } from 'redux'

interface InputItemProp {
  label: string
  name: string
  type: string
  value: string
}
interface ModalProp {
  onToggleShow: Function
}

// function InputItem(props: InputItemProp) {
//   return (
//     <div className="form-item">
//       <label htmlFor={props.name}>{props.label}</label>
//       <input name={props.name} type={props.type} onChange={} />
//     </div>
//   )
// }

function LoginModal(props: ModalProp) {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm: '',
    email: ''
  })
  const [isLogin, toggleLogin] = useState(true)

  function submitLogin() {
    const { username, password } = formData
    dispatch(
      login({
        username,
        password,
      })
    ).then((res) => {
      console.log('woooo', res)
    })
  }

  function submitRegister() {
    const { username, password, confirm, email } = formData
    if (password !== confirm) {
      alert('密码不统一！')
      return
    }
    dispatch(
      register({
        username,
        password,
        email
      })
    ).then((res) => {
      console.log('yoooo', res)
    })
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>, name: keyof typeof formData) {
    let newData = { ...formData }
    newData[name] = event.target.value
    setFormData(newData)
  }

  return ReactDOM.createPortal(
    <Wrapper onClick={() => props.onToggleShow(false)}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <form action="">
          <div className="form-item">
            <label htmlFor="username">用户名</label>
            <input name="username" type="text" value={formData.username} onChange={(e) => handleChange(e, 'username')} />
          </div>
          {!isLogin && (
            <div className="form-item">
              <label htmlFor="email">邮箱</label>
              <input name="email" type="text" value={formData.email} onChange={(e) => handleChange(e, 'email')} />
            </div>
          )}
          <div className="form-item">
            <label htmlFor="password">密码</label>
            <input name="password" type="password" value={formData.password} onChange={(e) => handleChange(e, 'password')} />
          </div>
          {!isLogin && (
            <div className="form-item">
              <label htmlFor="confirm">确认密码</label>
              <input name="confirm" type="password" value={formData.confirm} onChange={(e) => handleChange(e, 'confirm')} />
            </div>
          )}
        </form>
        <button className="btn-text" onClick={() => toggleLogin(!isLogin)}>
          {isLogin ? '注册?' : '登录?'}
        </button>
        <div className="modal-footer">
          <input type="button" value={isLogin ? '登录' : '注册'} onClick={() => (isLogin ? submitLogin() : submitRegister())} />
        </div>
      </div>
    </Wrapper>,
    document.body
  )
}

export default LoginModal
