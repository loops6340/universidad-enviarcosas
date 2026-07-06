"use client"

import DarkButton from "./UI/DarkButton"
import { BsClipboard2 } from "react-icons/bs";

const ArchivoClientFuncs = ({ content }: { content: string }) => {
  
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content)
  }

  return (

    <DarkButton onClick={copyToClipboard} className="mt-2"><BsClipboard2></BsClipboard2></DarkButton>


  )
}

export default ArchivoClientFuncs