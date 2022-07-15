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
    <div className=" w-screen h-[10vh] fixed flex items-center debug1 z-50 bg-secondary">
      <ul className="flex flex-row gap-5 items-center justify-around  w-full">
        {menu.map((item) => (
          <li key={item.title} className="">
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
