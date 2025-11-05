"use client"

import enviar from "@/actions/enviar";
import { useState } from "react";

export default function FormularoDeEnvioADiscord() {



  return (
    <div className="flex flex-col p-2 border border-black m-2 bg-zinc-50">
      <h1>Enviar codigo xd</h1>
      <form action={enviar} className="bg-zinc-50" >
        <div className="flex gap-2 items-stretch">
          <input type="radio" name="lang" id="txt" value="txt" />
          <label htmlFor="txt">txt</label>
          <input type="radio" name="lang" id="cpp" value="c++" />
          <label htmlFor="cpp">c++</label>
        </div>
        <textarea name="contenido" id="contenido" className="w-80 h-96 border border-black p-1" placeholder="escribir codigo"></textarea>
        {/* <input className="" type="file" name="subir archivo" id="" /> */}
        <button className="bg-amber-200 transition-[0.2s] p-2 border border-black hover:bg-cyan-200 cursor-pointer">Enviar</button>
      </form>


    </div>

  );
}
