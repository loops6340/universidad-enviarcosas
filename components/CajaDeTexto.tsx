"use client"

import { enviarMensaje } from '@/actions/enviar'
import { useRef, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import DarkButton from './UI/DarkButton'
import DarkInput from './UI/DarkInput'
import { AiFillEye } from 'react-icons/ai'
import { AiOutlineSend } from "react-icons/ai";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";

interface Props {
  updateMessages: () => void;
  disabled: boolean;
  transition: (param: () => void) => void;
  author: string;
  setAuthor: (author: string) => void
}

const CajaDeTexto = ({ updateMessages, disabled, transition, author, setAuthor }: Props) => {

  const fileInput = useRef<HTMLInputElement>(null)

  const onSubmit = async (formData: FormData) => {
    transition(async () => {
      try {
        await enviarMensaje(formData)
        updateMessages();
      } catch {
        alert("El límite de subida por archivo es de 4.5mb :(")
      }
    })
  }

  const [selectedFile, setSelectedFile] = useState("")


  return (
    <div className="mt-auto">
      {selectedFile && <div className="bg-white p-5">
        {selectedFile}
      </div>}
      <form action={onSubmit} className="bg-white flex border border-black border-l-0">
        <DarkInput notRounded className="w-25" value={author} onChange={(e) => setAuthor(e.target.value)} disabled={disabled} type="text" name="autor" placeholder="autor" />
        <label htmlFor="file-upload" className='cursor-pointer dark:bg-dm-light-primary  flex items-center p-2 border-l border-r'>
          <BsFillFileEarmarkPlusFill></BsFillFileEarmarkPlusFill>
        </label>
        <input onChange={(e) => setSelectedFile(e.target.value)} ref={fileInput} id="file-upload" type="file" className="hidden" name="file" />
        <input disabled={disabled} type="text" required name="contenido" className='p-2 dark:bg-dm-light-primary focus:outline-0 w-full'/>
        <DarkButton notRounded className='w-20 flex items-center text-[20px]'>
          <AiOutlineSend className="ml-auto mr-auto"/>
        </DarkButton>
      </form>
    </div>
  )
}

export default CajaDeTexto