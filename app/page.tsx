"use client";
import FormularioDeEnvioADiscord from "@/components/FormularioDeCodigo";
import ApyTypes, { Routes } from "discord-api-types/v10";
import axios from "axios";
import Image from "next/image";
import { Suspense, useEffect, useState, useTransition } from "react";
import Archivo from "@/components/Archivo";
import randomCol from "randomcolor";
import CajaDeTexto from "@/components/CajaDeTexto";
import DocumentFileInfoViewer from "@/components/DocumentFileInfoViewer";
import ListadoDeMensajes from "@/components/ListadoDeMensajes";
import obtenerMensajes from "@/actions/obtenerMensajes";
import FormularoDeEnvioADiscord from "@/components/FormularioDeCodigo";

const documentTypeExtensions = ["pdf", "docx", "xlsx"];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isPending, startTransition] = useTransition();

  async function updateMessages() {
    startTransition(async () => {
      setMessages(await obtenerMensajes());
    });
  }

  useEffect(() => {
    updateMessages();
  }, []);

  return (
    <>
    <FormularoDeEnvioADiscord updateMessages={updateMessages} disabled={isPending} transition={startTransition} />
    <div className="bg-[url(https://i.imgur.com/6qWFlY0.png)] bg-cover relative max-h-screen w-full md:w-[calc(100%-300px)] flex flex-1 flex-col bg-zinc-50 border-l border-black">
      <button
        className="border z-2  border-black absolute right-9 bottom-13 bg-background p-2 transition-[0.2s] hover:bg-cyan-200 cursor-pointer"
        onClick={updateMessages}
      >
        Actualizar mensajes
      </button>
      {isPending ? (
        <div className="items-center justify-center h-screen flex pt-2 pb-2 overflow-y-scroll flex-col-reverse gap-2">
          <div>Cargando...</div>
          <img src="https://media.tenor.com/v5aPfSD1VsgAAAAM/goddess-of-victory-nikke-doro-meme-run.gif" alt="" />
        </div>
      ) : (
        <ListadoDeMensajes messages={messages} />
      )}
      <CajaDeTexto disabled={isPending} transition={startTransition} updateMessages={updateMessages} />
    </div>
    </>
   
  );
}
