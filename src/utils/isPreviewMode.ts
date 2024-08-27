import { loadEnv } from "vite";
const {
  PUBLIC_PREVIEW_MODE,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");


const isPreviewMode = PUBLIC_PREVIEW_MODE || 'true';
export default isPreviewMode;