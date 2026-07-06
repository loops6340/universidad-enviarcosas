import React, { HTMLAttributes } from 'react'

const LightButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
        <button
            className="border z-2 text-darkmode-light-primary dark:bg-dm-light-primary dark:text-dm-dark-primary p-2 transition-[0.2s] dark:hover:bg-dm-dark-primary dark:hover:text-dm-light-primary cursor-pointer"
            {...props}
        >
            {props.children}
        </button>
  )
}

export default LightButton