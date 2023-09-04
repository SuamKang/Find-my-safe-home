/// <reference types="vite/client" />

// 타입스크립트 환경에선, import.meta.env를 타입스크립트에서 기본적으로 제공하지 않기 떄문에,
// ImportMetaEnv와 ImportMeta 인터페이스를 정의해주어야 한다.
interface ImportMetaEnv {
  readonly VITE_CUSTOM_ENV_VARIABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
