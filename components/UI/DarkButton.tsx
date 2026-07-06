import React, { HTMLAttributes } from 'react'

const DarkButton = (props: HTMLAttributes<HTMLButtonElement> & { notRounded?: boolean}) => {
  return (
        <button
            {...props}
            className={`
                dark:text-dm-light-primary border-0 ${props.notRounded ? "" : "rounded"} dark:bg-background p-2 transition-[0.2s] dark:hover:bg-dm-light-primary dark:hover:text-dm-dark-primary cursor-pointer ${props.className}`}
        >
            {props.children}
        </button>
  )
}

export default DarkButton;