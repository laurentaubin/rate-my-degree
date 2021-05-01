declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      GOOGLE_OAUTH_CLIENT_ID: string;
      GOOGLE_OAUTH_CLIENT_SECRET: string;
    }
  }
}

export {};
