import { ChatBody, Message } from './chat';

export interface GoogleBody extends ChatBody {
  googleAPIKey: string;
  googleCSEId: string;
}

export type GoogleAccount = {
  provider: string,
  type: string,
  providerAccountId: string,
  access_token: string,
  expires_at: number,
  scope: string | string[],
  token_type: string,
  id_token: string
}

export type GoogleToken = {
    name: string,
    email: string,
    picture: string,
    sub: string,
    access_token: string
}

export type GoogleData = {
  token: GoogleToken;
  account: GoogleAccount;
};

export interface GoogleResponse {
  message: Message;
}

export interface GoogleSource {
  title: string;
  link: string;
  displayLink: string;
  snippet: string;
  image: string;
  text: string;
}
