"use server"
import axios from "axios";
import { Routes } from "discord-api-types/v10";

async function obtenerMensajes() {
    const mensajes = await axios(
      `https://discord.com/api/v10${Routes.channelMessages("1459587832459952200")}`,
      {
        fetchOptions: {
          cache: "no-store",
        },
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`,
        },
      },
    );
    return mensajes.data
}

export default obtenerMensajes;