"use server"
import fs from 'fs'
import axios from 'axios'
import FormDataServer from 'form-data'
import { headers } from 'next/headers';
import { Readable } from 'stream';
import { refresh, revalidatePath, updateTag } from 'next/cache';


const DISCORD_TOKEN = process.env.TOKEN
const CHANNEL_ID = '1459587832459952200';


const enviarCodigo = async (formData: FormData) => {
  const contenido = formData.get("contenido") as string
  const filename = formData.get("filename") as string
  const form = new FormDataServer()
  const buffer = Buffer.from(contenido, "utf-8")
  const stream = Readable.from(buffer)
  const author = formData.get("author") as string

  form.append('payload_json', JSON.stringify({ content: author ? `{${author}}:${filename}` : filename }));
  
  form.append('files[0]', stream, `${filename}.java`);
  
  await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bot ${DISCORD_TOKEN}`
      }
    })
}




const enviarMensaje = async (formData: FormData) => {

  try {

  const autor = formData.get("autor") as string
  const contenido = formData.get("contenido") as string
  const file = formData.get("file") as File

  console.log(file.size)

  const fileArrayBuffer = await file.arrayBuffer()

  const buffer = Buffer.from(fileArrayBuffer)

  const stream = Readable.from(buffer)

  const form = new FormDataServer()

  if (file.size !== 0) {
    form.append('files[0]', stream, `${file.name}`);
  }

  form.append('payload_json', JSON.stringify({ content: autor ? `{${autor}}: ${contenido}` : contenido }));
  await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bot ${DISCORD_TOKEN}`
      }
    })
  } catch {
    return new Error("Limite excedido");
  }


}

export {
  enviarMensaje,
  enviarCodigo
}