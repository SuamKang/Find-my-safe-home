import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // 빌드된 파일이 생성될 디렉터리
    assetsDir: "assets", // 정적 자산 파일이 생성될 디렉터리
  },
});
