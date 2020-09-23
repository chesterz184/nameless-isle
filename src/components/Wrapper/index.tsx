import React from 'react'
import './index.styl'

interface IProps {
  children: JSX.Element,
  onClick: Function
}

function Wrapper(props: IProps) {
  return (
    <div onClick={(e) => props.onClick(e) } className="wrapper">{props.children}</div>
  )
}

export default Wrapper