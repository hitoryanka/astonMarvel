/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_KEY: string;
  readonly HASH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
