/// <reference types="vite/client" />
// LEARN what is this?
interface ImportMetaEnv {
  readonly PUBLIC_KEY: string;
  readonly HASH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
