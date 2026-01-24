
import FormularioDeEnvioADiscord from "@/components/FormularioDeCodigo";
import ApyTypes, { Routes } from "discord-api-types/v10";
import axios from 'axios'
import Image from 'next/image'
import { Suspense } from "react";
import Archivo from "@/components/Archivo";
import randomCol from 'randomcolor'
import CajaDeTexto from "@/components/CajaDeTexto";
import { refresh, revalidatePath } from "next/cache";
import DocumentFileInfoViewer from "@/components/DocumentFileInfoViewer";


const documentTypeExtensions = ['pdf', 'docx', 'xlsx']


export default async function Home() {
  const regex = /^\{([^}]+)\}:(.+)$/;
  let messages: any;

  console.log(`https://discord.com/api/v10${Routes.channelMessages("1459587832459952200")}`)
  try {
    messages = await axios(`https://discord.com/api/v10${Routes.channelMessages("1459587832459952200")}`, {
      fetchOptions: {
        cache: "no-store"
      },
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`
      }
    })
  } catch (e: any) {
  }



  const refrescarPagina = async () => {
    "use server"
    revalidatePath("/", 'page')
  }

  return (
      <div className="bg-cover relative max-h-screen w-full md:w-[calc(100%-300px)] flex flex-1 flex-col bg-zinc-50 border-l border-black">
        <button
          className="border z-50  border-black absolute right-9 bottom-13 bg-background p-2 transition-[0.2s] hover:bg-cyan-200 cursor-pointer"
          onClick={refrescarPagina}
        >Actualizar mensajes</button>

        <div className="pt-2 pb-2 overflow-y-scroll  flex items-start flex-col-reverse gap-2">
          {
            messages.data.map((message: any, i: number) =>
              (message.content || message.attachments[0].url) && (
                <div className="pl-2 flex items-start gap-2 max-w-full" key={i}>
                  <div className="w-[50px] min-w-[50px] h-[50px] border border-black" style={{ backgroundColor: randomCol({ luminosity: "light", seed: message.author.id !== "1073726760350392340" ? message.author.avatar : Math.random().toString() }) }} />
                  <div className="bg-white flex flex-col border border-black p-2 rounded">
                    <div className="font-bold md:max-w-200">{message.content.match(regex) ? message.content.match(regex)[1] : "Anónimo"}</div>
                    <div className="md:max-w-200">{message.content.match(regex) ? message.content.match(regex)[2] : message.content}</div>
                    
                    {message.attachments[0] &&                     
                    <Suspense fallback={<div>Cargando...</div>}>
                      {(message.attachments[0].url && !documentTypeExtensions.some(type => message.attachments[0].url.includes(type))) ? <Archivo url={message.attachments[0].url} /> : <DocumentFileInfoViewer url={message.attachments[0].url} filename={message.attachments[0].filename}/> }
                    </Suspense>
                    }
                  </div>
                </div>
              ))
          }
        </div>
        <CajaDeTexto />
      </div>

  );
}
