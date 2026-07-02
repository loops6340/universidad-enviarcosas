"use client"

import { enviarMensaje } from '@/actions/enviar'
import { useRef, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'

const CajaDeTexto = ({ updateMessages, disabled, transition, author, setAuthor }: { author: string, setAuthor: any, transition: any, updateMessages: any, disabled: boolean}) => {

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
        <input value={author} onChange={(e) => setAuthor(e.target.value)} disabled={disabled} type="text" name="autor" placeholder="autor" className='bg-background p-2 focus:outline-0 w-25 text-darkmode-light-primary'/>
        <label htmlFor="file-upload" className='flex items-center p-2 border-l border-r'>📎</label>
        <input onChange={(e) => setSelectedFile(e.target.value)} ref={fileInput} id="file-upload" type="file" className="hidden" name="file" />
        <input disabled={disabled} type="text" required name="contenido" className='p-2 focus:outline-0 w-full'/>
        <button disabled={disabled} className='p-2 bg-background  transition-[0.2s] hover:bg-cyan-200 cursor-pointer text-darkmode-light-primary'>Enviar</button>
      </form>
    </div>
  )
}

export default CajaDeTexto