import React from 'react'

const menu = [
  {
    title: 'projects',
    url: '#projects'
  },
  {
    title: 'contact',
    url: '#contact'
  }
]

export const NavBar = () => {
  return (
    <div className="debug1 w-screen h-[10vh] fixed flex items-center">
      <ul className="flex flex-row gap-5 items-center justify-around debug1 w-full">
        {menu.map((item) => (
          <li className="">{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
