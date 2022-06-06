import React from 'react'

const Button = ({ className, onClick, children, type }) => {
  return (
    <button type={ type ?? 'button' } className={ `${className} hover:bg-slate-50/50 bg-white py-2 px-5 rounded-md shadow`} onClick={onClick}>{children}</button>
  )
}

export default Button