"use server"
import fs from 'fs'
import axios from 'axios'
import FormDataServer from 'form-data'
import { headers } from 'next/headers';
import { Readable } from 'stream';
import { refresh, revalidatePath } from 'next/cache';


const DISCORD_TOKEN = process.env.TOKEN
const CHANNEL_ID = '1459587832459952200';


const enviarCodigo = async (formData: FormData) => {
  const contenido = formData.get("contenido") as string
  let lang = formData.get("lang")
  const form = new FormDataServer()
  const buffer = Buffer.from(contenido, "utf-8")
  const stream = Readable.from(buffer)


  switch (lang) {
    case "c++":
      lang = "cpp"
      break;
    case "txt":
      lang = "txt"
    case "psc":
      lang = "psc"
    default:
      lang = "txt"
      break;
  }

  form.append('files[0]', stream, `archivo.${lang}`);
  const res = await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bot ${DISCORD_TOKEN}`
      }
    })

  revalidatePath("/")
}


const enviarArchivo = async (formData: FormData) => {
  const contenido = formData.get("contenido") as string
  let extension = formData.get("extension")
  const form = new FormDataServer()
  const buffer = Buffer.from(contenido, "utf-8")
  const stream = Readable.from(buffer)


  switch (extension) {
    case "pdf":
      extension = "pdf"
      break;
    case "txt":
      extension = "txt"
    case "docx":
      extension = "psc"
    default:
      extension = "docx"
      break;
  }

  form.append('files[0]', stream, `archivo.${extension}`);
  await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bot ${DISCORD_TOKEN}`
      }
    })

  revalidatePath("/")
}

const enviarMensaje = async (formData: FormData) => {
  const autor = formData.get("autor") as string
  const contenido = formData.get("contenido") as string
  // const file = formData.get("file") as File

  // const fileArrayBuffer = await file.arrayBuffer()

  // const buffer = Buffer.from(fileArrayBuffer)

  // const stream = Readable.from(buffer)

  const form = new FormDataServer()

  // form.append('files[0]', stream, `archivo.${"docx"}`);

  form.append('payload_json', JSON.stringify({ content: autor ? `{${autor}}: ${contenido}` : contenido }));
  await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bot ${DISCORD_TOKEN}`
      }
    })
  revalidatePath("/")

}

export {
  enviarMensaje,
  enviarArchivo,
  enviarCodigo
}