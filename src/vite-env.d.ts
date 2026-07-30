/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_API_KEY: string
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_DEFAULT_CITY: string
    readonly VITE_APP_DEBUG: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}