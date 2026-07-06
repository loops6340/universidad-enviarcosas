"use server"
import axios from "axios";
import { Routes } from "discord-api-types/v10";
import BaseService from "./BaseService";

class DiscordMessagesService extends BaseService {
  private limitOfMessagesPerRequest: number = 50;
  private channel = "1459587832459952200";

  constructor(limit: number) {
    super();
    this.limitOfMessagesPerRequest = limit;
  }

  setLimitOfMessagesPerRequest(limit: number) {
    this.limitOfMessagesPerRequest = limit;
  }

  private async messagesRequest(limit?: number, before?: string, after?: string) {
    const url = new URL(`https://discord.com/api/v10${Routes.channelMessages(this.channel)}`);

    if (limit) {
        url.searchParams.set("limit", limit.toString());
    }
    if (before) {
        url.searchParams.set("before", before);
    }
    
    const mensajes = await axios(url.toString(),
      {
        fetchOptions: {
          cache: "no-store",
        },
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`,
        },
      },
    );
    return mensajes.data as Message[]
  }

  async getMostsRecent() {
    return await this.messagesRequest(this.limitOfMessagesPerRequest);
  }
}

export default DiscordMessagesService;