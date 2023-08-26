export type GoogleAccount = {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  expires_at: number;
  scope: string | string[];
  token_type: string;
  id_token: string;
};

export type GoogleToken = {
  name: string;
  email: string;
  picture: string;
  sub: string;
  access_token: string;
};

export type GoogleData = {
  token: GoogleToken;
  account: GoogleAccount;
};
