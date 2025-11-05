import { enviarMensaje } from '@/actions/enviar'
import React from 'react'

const CajaDeTexto = () => {
  return (
    <form action={enviarMensaje} className="flex gap-2 border border-black border-l-0">
        <input type="text" name="autor" placeholder="autor" className='bg-amber-200 p-2 focus:outline-0 w-25'/>
        <input type="text" name="contenido" className='p-2 focus:outline-0 w-full'/>
        <button className='p-2 bg-amber-200 transition-[0.2s] hover:bg-cyan-200 cursor-pointer'>Enviar</button>
        {/* <input type="button" value="enviar" className='p-2 bg-amber-200'/> */}
    </form>
  )
}

export default CajaDeTexto