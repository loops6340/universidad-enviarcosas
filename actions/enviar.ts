"use server"
import fs from 'fs'
import axios from 'axios'
import FormDataServer from 'form-data'
import { headers } from 'next/headers';
import { Readable } from 'stream';
import { refresh } from 'next/cache';


const DISCORD_TOKEN = process.env.TOKEN
const CHANNEL_ID = '1425268109434032227';


const enviarCodigo = async (formData: FormData) => {
  const contenido = formData.get("contenido") as string
  const lang = formData.get("lang")
  const form = new FormDataServer()
  const buffer = Buffer.from(contenido, "utf-8")
  const stream = Readable.from(buffer)

  form.append('files[0]', stream, `archivo.${lang}`);
  const res = await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bot ${DISCORD_TOKEN}`
      }
    })

  console.log(res.data)
  refresh()
}

export default enviarCodigo

const enviarMensaje = async (formData: FormData) => {
  const autor = formData.get("autor") as string
  const contenido = formData.get("contenido") as string
  const form = new FormDataServer()


  form.append('payload_json', JSON.stringify({ content: autor ? `{${autor}}: ${contenido}` : contenido }));
  const res = await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, form,
    {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bot ${DISCORD_TOKEN}`
      }
    })
  console.log(res.data)
  refresh()

}

export {
  enviarMensaje
}