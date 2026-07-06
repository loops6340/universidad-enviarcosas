import React, { HTMLAttributes } from 'react'
import type { JSX } from 'react'
const DarkButton = (props: JSX.IntrinsicElements['input'] & {notRounded?: boolean}) => {
  return (
        <input
            {...props}
            className={`
                dark:text-dm-light-primary border-0 focus:outline-0 ${props.notRounded ? "" : "rounded"} dark:bg-background p-2 transition-[0.2s] dark:hover:bg-dm-light-primary dark:hover:text-dm-dark-primary cursor-pointer ${props.className}`}
        >
            {props.children}
        </input>
  )
}

export default DarkButton;