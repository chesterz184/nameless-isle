import React, { useState } from 'react'
import './index.styl'
import LoginModal from '@/components/LoginModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'

function UserInfo() {
  const [showModal, setShowModal] = useState(false)
  const userInfo = useSelector((state: RootState) => state.user)
  const { username } = userInfo
  return (
    <div>
      {username ? (
        <span>{userInfo.username}</span>
      ) : (
        <button className="login-button" onClick={() => setShowModal(true)}>
          Login
        </button>
      )}
      {showModal && <LoginModal onToggleShow={(show: boolean) => setShowModal(show)}></LoginModal>}
    </div>
  )
}

export default UserInfo
