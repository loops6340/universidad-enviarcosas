"use client"

import { enviarCodigo } from "@/actions/enviar";
import LightButton from "./UI/LightButton";

interface Props {
  transition: (fn: () => void) => void, 
  updateMessages: () => void, 
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

    <div className="dark:text-dm-light-primary hidden md:block px-2 bg-background w-[300px]">
      <div className="hidden md:flex flex-col p-2 gap-2 text-darkmode-light-primary mx-2 bg-dm-dark-secondary">
        <h1>Enviar codigo xd</h1>
        <form action={onSubmit} className="flex flex-col gap-2" >
          <input required type="text" name="filename" className="focus:outline-0 border dark:text-dm-dark-primary dark:bg-dm-light-primary p-2" placeholder="nombre del archivo" />
          <textarea spellCheck={false} disabled={disabled} required name="contenido" id="contenido" className="p-2 dark:bg-dm-dark-secondary border border-dm-light-primary focus:outline-0 w-full h-96 " placeholder="escribir codigo"></textarea>
          <LightButton>Enviar</LightButton>
        </form>
      </div>
    </div>


  );
}
