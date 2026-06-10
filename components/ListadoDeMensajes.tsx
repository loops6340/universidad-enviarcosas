"use client"
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import DocumentFileInfoViewer from "./DocumentFileInfoViewer";
import Archivo from "./Archivo";
import randomCol from "randomcolor";
import { Routes } from "discord-api-types/v10";
import obtenerMensajes from "@/actions/obtenerMensajes";

const documentTypeExtensions = ["pdf", "docx", "xlsx"];

const ListadoDeMensajes = ({ messages }: {messages: any[]}) => {
  const regex = /^\{([^}]+)\}:(.+)$/;

// //   const [messages, setMessages] = useState([])

// //   async function updateMessages() {
// //     setMessages(await obtenerMensajes())

// //   }

//   useEffect(() => {
//     updateMessages()
//   }, [])

  return (
      <div className="h-full pt-2 pb-2 overflow-y-scroll  flex items-start flex-col-reverse gap-2">
        {messages.map(
          (message: any, i: number) =>
            (message.content || message.attachments[0].url) && (
                <div className="pl-2 flex items-start gap-2 max-w-full" key={i}>
                  <div
                    className="w-[50px] min-w-[50px] h-[50px] border border-black"
                    style={{
                      backgroundColor: randomCol({
                        luminosity: "light",
                        seed:
                          message.author.id !== "1073726760350392340"
                            ? message.author.avatar
                            : Math.random().toString(),
                      }),
                    }}
                  />
                  <div className="bg-white flex flex-col border border-black p-2 rounded">
                    <div className="font-bold md:max-w-200">
                      {message.content.match(regex)
                        ? message.content.match(regex)[1]
                        : "Anónimo"}
                    </div>
                    <div className="md:max-w-200">
                      {message.content.match(regex)
                        ? message.content.match(regex)[2]
                        : message.content}
                    </div>

                    {message.attachments[0] && (
                      <Suspense fallback={<div>Cargando...</div>}>
                        {message.attachments[0].url &&
                        !documentTypeExtensions.some((type) =>
                          message.attachments[0].url.includes(type),
                        ) ? (
                          <Archivo url={message.attachments[0].url} />
                        ) : (
                          <DocumentFileInfoViewer
                            url={message.attachments[0].url}
                            filename={message.attachments[0].filename}
                          />
                        )}
                      </Suspense>
                    )}
                  </div>
                </div>
            ),
        )}
      </div>
  )
}

export default ListadoDeMensajes