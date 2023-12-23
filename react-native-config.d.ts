declare module 'react-native-config' {
  export interface NativeConfig {
    UNSPLASH_API_BASE: string;
    UNSPLASH_PHOTOS: string;
    ACCESS_KEY: string;
    SECRET_KEY: string;
    UNSPLASH_APP_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
