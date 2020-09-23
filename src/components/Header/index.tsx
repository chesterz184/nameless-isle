import React from 'react'
import { Link } from 'react-router-dom'
import './index.styl'
import logo from '@/assets/images/logo.png'
import UserInfo from './UserInfo'

function Header() {
  let navList = [
    {
      name: 'HOME',
      link: '/',
    },
    {
      name: 'ARCHIVES',
      link: '/archives',
    },
    {
      name: 'ABOUT',
      link: '/about',
    },
  ]
  return (
    <header>
      <nav>
        <img src={logo} alt="logo" className="logo" />
        <div className="link-container">
          {navList.map((item) => (
            <Link className="nav-link" to={item.link} key={item.name}>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <UserInfo></UserInfo>
    </header>
  )
}

export default Header
