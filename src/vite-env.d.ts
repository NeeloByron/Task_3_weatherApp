/// <reference types="vite/client" />
interface ImportMetaEnv {
    //API
    readonly VITE_APP_API_KEY: string
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_GEO_URL: string
    readonly VITE_APP_DEFAULT_CITY: string
    readonly VITE_APP_UNITS: string

    //Geolocation
    readonly VITE_APP_ENABLE_GEOLOCATION: string
    readonly VITE_APP_GEOLOCATION_TIMEOUT: string
    readonly VITE_APP_GEOLOCATION_MAX_AGE: string
    readonly VITE_APP_GEOLOCATION_ENABLE_HIGH_ACCURACY: string

    readonly VITE_APP_DEBUG: string
    readonly VITE_APP_LANG: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}