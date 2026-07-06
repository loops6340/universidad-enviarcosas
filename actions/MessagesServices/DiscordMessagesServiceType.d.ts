interface Message {
  type: number;
  content: string;
  mentions: unknown[];
  mention_roles: unknown[];
  attachments: Attachment[];
  embeds: unknown[];
  timestamp: string;
  edited_timestamp: null;
  flags: number;
  components: unknown[];
  id: string;
  channel_id: string;
  author: Author;
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
}

interface Author {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  bot?: boolean;
  banner: null;
  accent_color: null;
  global_name: null | string;
  avatar_decoration_data: null;
  collectibles: null;
  display_name_styles: null;
  banner_color: null;
  clan: Clan | null;
  primary_guild: Clan | null;
}

interface Clan {
  identity_guild_id: string;
  identity_enabled: boolean;
  tag: string;
  badge: string;
}

interface Attachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  content_type: string;
  content_scan_version: number;
}