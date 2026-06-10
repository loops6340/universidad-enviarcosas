"use client"

import { enviarMensaje } from '@/actions/enviar'
import { useTransition } from 'react'
import { useFormStatus } from 'react-dom'

const CajaDeTexto = ({ updateMessages, disabled, transition }: {transition: any, updateMessages: any, disabled: boolean}) => {

  
  const onSubmit = async (formData: FormData) => {
    transition(async () => {
      await enviarMensaje(formData)
      updateMessages();
    })
  }

  return (
    <form action={onSubmit} className="bg-white flex border border-black border-l-0">
        <input disabled={disabled} type="text" name="autor" placeholder="autor" className='bg-background p-2 focus:outline-0 w-25'/>
        {/* <label htmlFor="file-upload" className='flex items-center p-2 border-l border-r'>📎</label>
        <input id="file-upload" type="file" className="hidden" name="file" /> */}
        <input disabled={disabled} type="text" required name="contenido" className='p-2 focus:outline-0 w-full'/>
        <button disabled={disabled} className='p-2 bg-background  transition-[0.2s] hover:bg-cyan-200 cursor-pointer'>Enviar</button>
        {/* <input type="button" value="enviar" className='p-2 bg-amber-200'/> */}
    </form>
  )
}

export default CajaDeTexto