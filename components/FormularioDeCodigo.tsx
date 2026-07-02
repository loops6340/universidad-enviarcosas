"use client"

import { enviarCodigo } from "@/actions/enviar";

interface Props {
  transition: any, 
  updateMessages: any, 
  disabled: boolean,
  author: string;
}

export default function FormularoDeEnvioADiscord({ 
  updateMessages, disabled, transition, author
}: Props) {

  const onSubmit = async (formData: FormData) => {
    formData.set("author", author)
    transition(async () => {
      await enviarCodigo(formData)
      updateMessages();
    })
  }

  return (

    <div className="hidden md:block px-2 bg-background w-[300px]">
      <div className="hidden md:flex flex-col px-2 text-darkmode-light-primary mx-2 bg-darkmode-dark-secondary">
        <h1>Enviar codigo xd</h1>
        <form action={onSubmit} className="flex flex-col gap-2" >
          <div className="flex gap-2 items-stretch">
            <input type="radio" name="lang" id="txt" value="txt" />
            <label htmlFor="txt">txt</label>
            <input type="radio" name="lang" id="cpp" value="c++" />
            <label htmlFor="cpp">c++</label>
            <input type="radio" name="lang" id="java" value="java" />
            <label htmlFor="java">java</label>
            <input type="radio" name="lang" id="pseint" value="psc" />
            <label htmlFor="pseint">pseint</label>
          </div>
          <input required type="text" name="filename" className="focus:outline-0" placeholder="nombre del archivo" />
          <textarea disabled={disabled} required name="contenido" id="contenido" className="focus:outline-0 w-full h-96 " placeholder="escribir codigo"></textarea>
          <button className="bg-darkmode-light-primary p-2 text-black transition-[0.2s] hover:bg-cyan-200 cursor-pointer">Enviar</button>
        </form>
      </div>
    </div>


  );
}
