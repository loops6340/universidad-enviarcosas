"use client";
import { RefObject, useEffect, useRef, useState, useTransition } from "react";
import CajaDeTexto from "@/components/CajaDeTexto";
import ListadoDeMensajes from "@/components/ListadoDeMensajes";
import * as DiscordMessagesService from "@/actions/Messages";
import FormularoDeEnvioADiscord from "@/components/FormularioDeCodigo";
import NavBar from "@/components/UI/NavBar";
import DarkButton from "@/components/UI/DarkButton";
import FilesList from "@/components/FilesList";
import { BsChevronDoubleDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const [author, setAuthor] = useState("");
  const [lastMessageId, setLastMessageId] = useState("");

  async function updateMessages() {
    startTransition(async () => {
      try {
        const messages = await DiscordMessagesService.getMostsRecent();
        setMessages(messages);

        const lastMessage = messages.at(-1)!;

        if (lastMessage) {
          setLastMessageId(lastMessage.id);
        }
      } catch {
        alert(
          "Hubo un error, el máximo de tamaño de archivo subido es de 4.5 mb :'v",
        );
      }
    });
  }

  async function updateToPreviousMensajes() {
    startTransition(async () => {
      try {
        const messages = await DiscordMessagesService.getBefore(lastMessageId);
        setMessages(messages);
        console.log(JSON.stringify(messages));
        setLastMessageId(messages[49].id);
      } catch {
        alert(
          "Hubo un error, el máximo de tamaño de archivo subido es de 4.5 mb :'v",
        );
      }
    });
  }

  const filesList = useRef<HTMLInputElement>(null)!;

  useEffect(() => {
    updateMessages();
  }, []);

  return (
    <div className="max-h-screen h-screen flex flex-col">
      <NavBar route="Chat" />
      <div className="flex-1 min-h-0 flex">
        <FormularoDeEnvioADiscord
          author={author}
          updateMessages={updateMessages}
          disabled={isPending}
          transition={startTransition}
        />
        <div className="bg-[url(https://i.imgur.com/6qWFlY0.png)] bg-cover relative w-full md:w-[calc(100%-300px)] flex flex-1 flex-col bg-zinc-50 border-l border-black">


          {isPending ? (
            <div className="items-center justify-center h-screen flex pt-2 pb-2 overflow-y-scroll flex-col-reverse gap-2">
              <div>Cargando...</div>
              <img
                src="https://media.tenor.com/v5aPfSD1VsgAAAAM/goddess-of-victory-nikke-doro-meme-run.gif"
                alt=""
              />
            </div>
          ) : (
            <div className="flex flex-1 min-h-0">
              <div className="flex flex-col min-w-0 flex-2 min-h-0">
                <ListadoDeMensajes filesListRef={filesList} updateMessages={updateMessages} updateToPreviousMessages={updateToPreviousMensajes} messages={messages} />

                <CajaDeTexto
                  author={author}
                  setAuthor={setAuthor}
                  disabled={isPending}
                  transition={startTransition}
                  updateMessages={updateMessages}
                />
              </div>
              <FilesList ref={filesList} messages={messages} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
