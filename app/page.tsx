
import FormularioDeEnvioADiscord from "@/components/FormularioDeEnvioADiscord";
import ApyTypes, { Routes } from "discord-api-types/v10";
import axios from 'axios'
import Image from 'next/image'
import { Suspense } from "react";
import Archivo from "@/components/Archivo";
import randomCol from 'randomcolor'
import CajaDeTexto from "@/components/CajaDeTexto";
import { refresh, revalidatePath } from "next/cache";



export default async function Home() {
  const regex = /^\{([^}]+)\}:(.+)$/;
  let messages: any;

  console.log(`https://discord.com/api/v10${Routes.channelMessages("1425268109434032227")}`)
  try {
  messages = await axios(`https://discord.com/api/v10${Routes.channelMessages("1425268109434032225")}`, {
    fetchOptions: {
      cache: "no-store"
    },
    headers: {
      Authorization: `Bot ${process.env.TOKEN}`
    }
  })
  } catch (e:any) {
  }
  


  const refrescarPagina = async () => {
    "use server"
    revalidatePath("/")
  }

  return (
    <div className="flex flex-col-reverse md:flex-row max-h-screen items-center justify-center font-sans text-black bg-amber-200 border-b border-black">
      <FormularioDeEnvioADiscord />
      <div className="relative max-h-screen w-[calc(100%-300px)] flex flex-1 flex-col bg-zinc-50 border-l border-black">
        <button
         className="border z-50  border-black absolute right-9 bottom-13 bg-amber-200 p-2 transition-[0.2s] hover:bg-cyan-200 cursor-pointer"
         onClick={refrescarPagina}
         >Actualizar mensajes</button>
        
        <div className="pt-2 pb-2 overflow-y-scroll  flex items-start flex-col-reverse gap-2">
          {
            messages.data.map((message: any, i: number) =>
              (message.content || message.attachments[0].url) && (
                <div className="pl-2 flex items-start gap-2 max-w-full" key={i}>
                  <div className="w-[50px] min-w-[50px] h-[50px] border border-black" style={{ backgroundColor: randomCol({ luminosity: "light",  seed: message.author.id !== "1073726760350392340" ? message.author.avatar : Math.random().toString()}) }} />
                  <div className="flex flex-col border border-black p-2 rounded">
                    <div className="font-bold">{message.content.match(regex) ? message.content.match(regex)[1]: "Anónimo"}</div>
                    <div>{message.content.match(regex) ? message.content.match(regex)[2]: message.content}</div>
                    <Suspense fallback={<div></div>}>
                      {message.attachments[0]?.url && <Archivo url={message.attachments[0].url} />}
                    </Suspense>
                  </div>
                </div>
              ))
          }
        </div>
        <CajaDeTexto />
      </div>

    </div>
  );
}
