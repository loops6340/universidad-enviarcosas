"use client";
import axios from "axios";
import { Ref, RefObject, Suspense, useEffect, useRef, useState } from "react";
import DocumentFileInfoViewer from "./DocumentFileInfoViewer";
import Archivo from "./Archivo";
import randomCol from "randomcolor";
import DarkButton from "./UI/DarkButton";
import { BsChevronDoubleDown, BsChevronUp } from "react-icons/bs";
import DiscordMessagesService from "@/actions/MessagesServices/DiscordMessagesService";

const textFileExtensions = ["txt", "java", "cpp", "png", "jpg", "jpeg"];

interface Props {
  messages: Message[];
  updateToPreviousMessages: () => void;
  updateMessages: () => void;
  filesListRef: RefObject<HTMLDivElement | null>;
}

const ListadoDeMensajes = ({ messages, updateMessages, updateToPreviousMessages, filesListRef }: Props) => {
  const regex = /^\{([^}]+)\}:(.+)$/;
  
  const controlButtons = useRef<HTMLDivElement>(null);


  useEffect(() => {
    controlButtons.current!.style = `position: asbolute; right: ${filesListRef.current!.clientWidth + 30}px`
  }, []);


  return (
    <div className="flex-1 min-h-0 overflow-auto pt-2 pb-2 flex items-start flex-col-reverse gap-2">
        <div ref={controlButtons} className="absolute flex flex-col gap-2 bottom-18">
          <DarkButton
            className="z-5"
            onClick={updateToPreviousMessages}
          >
            <BsChevronUp />
          </DarkButton>

          <DarkButton onClick={updateMessages} className="z-50">
            <BsChevronDoubleDown />
          </DarkButton>
        </div>
      {messages.map(
        (message: Message, i: number) =>
          (message.content || message.attachments[0].url) && (
            <div className="pl-2 flex items-start gap-2 max-w-full" key={i}>
              {message.author.id !== "1073726760350392340" ? (
                <img
                  className="w-[50px] h-[50px] border border-black"
                  src={`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`}
                  alt=""
                />
              ) : (
                <div
                  className="w-[50px] min-w-[50px] h-[50px] border border-black"
                  style={{
                    backgroundColor: randomCol({
                      luminosity: "light",
                      seed:
                        message.author.id !== "1073726760350392340"
                          ? message.author.avatar
                          : // eslint-disable-next-line react-hooks/purity
                            Math.random().toString(),
                    }),
                  }}
                />
              )}

              <div className="dark:bg-dm-dark-primary dark:text-dm-light-primary flex flex-col border border-black p-2 rounded">
                <div className="font-bold md:max-w-200">
                  {message.content.match(regex)
                    ? message.content.match(regex)![1]
                    : "Anónimo"}
                </div>

                <div className="md:max-w-200">
                  {message.content.match(regex)
                    ? message.content.match(regex)![2]
                    : message.content}
                </div>

                {message.attachments[0] && (
                  <Suspense fallback={<div>Cargando...</div>}>
                    {message.attachments[0].url &&
                    textFileExtensions.some((type) =>
                      message.attachments[0].url.includes(type),
                    ) ? (
                      <Archivo readonly url={message.attachments[0].url} />
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
  );
};

export default ListadoDeMensajes;
