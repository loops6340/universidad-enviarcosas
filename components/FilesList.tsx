/* eslint-disable react-hooks/refs */
import extensionImages from "./DocumentFileExtensions";
import Visibility from "@/public/visibility.svg";
import RemoveRedEyeIcon from "@mui/material/Icon";
import { Ref, useState } from "react";
import Codigo from "./Archivo/Codigo";
import Archivo from "./Archivo";
import { AiFillEye } from "react-icons/ai";
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  messages: Message[];
  ref: Ref<HTMLDivElement>
}

const FilesList = (props: Props) => {
  const [codeUrl, setCodeUrl] = useState("");
  const [showWindow, setShowWindow] = useState(false);

  const showCodeMirrorWindow = (url: string) => {
    setCodeUrl(url);
    setShowWindow(!showWindow);
  };

  return (
    <div ref={props.ref} className="hidden md:flex flex-col flex-1 min-h-0 overflow-auto p-2 gap-2 dark:bg-dm-dark-primary">
      {props.messages
        .filter((el) => el.attachments.length !== 0)
        .map((message, i) => {
          const instant = Temporal.Instant.from(message.timestamp);
          const zoned = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId());

          const dd = String(zoned.day).padStart(2, "0");
          const mm = String(zoned.month).padStart(2, "0");
          const yy = String(zoned.year % 100).padStart(2, "0");

          const hour = zoned.hour % 12 || 12;
          const minute = String(zoned.minute).padStart(2, "0");
          const ampm = zoned.hour >= 12 ? "pm" : "am";

          const formatted = `${dd}/${mm}/${yy} ${hour}:${minute}${ampm}`;

          return (
            <div
              key={i}
              className="flex p-2 min-w-70 gap-2 dark:bg-dm-dark-secondary dark:text-dm-light-primary flex-col"
            >
              <div className="flex p-2 gap-2 items-center border-b dark:border-b-dm-light-primary">
                <a className="flex gap-5 items-center w-full" href={message.attachments[0].url}>
                  <img
                    src={
                      extensionImages.find((ex) =>
                        message.attachments[0].url.includes(ex.name),
                      )?.imageUrl
                    }
                    className="w-10"
                    alt=""
                  />
                  <h2 className="max-w-40 wrap-break-word">{message.attachments[0].filename}</h2>
                </a>
                <div
                  onClick={() =>
                    showCodeMirrorWindow(message.attachments[0].url)
                  }
                  className="dark:bg-dm-light-primary border ml-auto p-1 text-[20px] dark cursor-pointer dark:text-dm-dark-primary rounded-full"
                >
                  <AiFillEye color="var(--color-dm-dark-primary)" scale={60} />
                </div>
              </div>
              <div className="text-[10px]">{formatted}</div>
            </div>
          );
        })}
      {showWindow && (
        <div className="flex flex-col gap-2 dark:text-dm-light-primary fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] p-6 bg-dm-dark-primary">
          <div className="flex">
            <h1>Codigo</h1>
            <button className="ml-auto" onClick={() => setShowWindow(false)}>X</button>
          </div>
          <Archivo readonly url={codeUrl} />
        </div>
      )}
    </div>
  );
};

export default FilesList;
