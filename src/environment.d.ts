declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_KEY: string;
      HASHED_KEY: string;
    }
  }
}
