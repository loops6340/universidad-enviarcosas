"use client"

import { enviarCodigo } from "@/actions/enviar";
import { useState } from "react";
import Codigo from "./Archivo/Codigo";

export default function FormularoDeEnvioADiscord({ updateMessages, disabled, transition }: {transition: any, updateMessages: any, disabled: boolean}) {


  const onSubmit = async (formData: FormData) => {
    transition(async () => {
      await enviarCodigo(formData)
      updateMessages();
    })
  }

  return (

    <div className="h-screen bg-background w-[300px]">
      <div className="hidden md:flex flex-col p-2 border border-black m-2 bg-zinc-50">
        <h1>Enviar codigo xd</h1>
        <form action={onSubmit} className="flex flex-col gap-2 bg-zinc-50" >
          <div className="flex gap-2 items-stretch">
            <input type="radio" name="lang" id="txt" value="txt" />
            <label htmlFor="txt">txt</label>
            <input type="radio" name="lang" id="cpp" value="c++" />
            <label htmlFor="cpp">c++</label>
            <input type="radio" name="lang" id="pseint" value="psc" />
            <label htmlFor="pseint">pseint</label>
            <input type="radio" name="lang" id="java" value="java" />
            <label htmlFor="java">java</label>
          </div>
          <textarea disabled={disabled} required name="contenido" id="contenido" className="w-full h-96 border border-black p-1" placeholder="escribir codigo"></textarea>
          <button className="bg-background transition-[0.2s] p-2 border border-black hover:bg-cyan-200 cursor-pointer">Enviar</button>
        </form>
      </div>
      <div className="p-4 text-[9px]">
        <p>wip:</p>
        <p>botonde panico</p>
        <p>subir archivso</p>
      </div>

    </div>


  );
}
