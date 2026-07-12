import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from '@tailwindcss/vite'

const copyFiles = [
    "system.json",
]

const copyDirectories = [
    "lang",
    "templates"
]

const copyFilesPlugin = {
    name: "copy-system-json",
    apply: "build",
    writeBundle() {
        copyFiles.forEach((file) => {
            fs.copyFileSync(
                path.resolve(__dirname, file),
                path.resolve(__dirname, `dist/${file}`)
            );
        });

        copyDirectories.forEach((dir) => {
            fs.cpSync(
                path.resolve(__dirname, `src/${dir}`),
                path.resolve(__dirname, `dist/${dir}`),
                { recursive: true, force: true }
            );
        });
    }
}

export default defineConfig({
    plugins: [copyFilesPlugin, svelte(), tailwindcss(
        
    )],
    root: "src",
    base: "/systems/vagabond-vtt-system/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@client": path.resolve(__dirname, "foundry/client"),
            "@common": path.resolve(__dirname, "foundry/common"),
            "@/*": path.resolve(__dirname, "src/*"),
            "@ui": path.resolve(__dirname, "src/ui"),
            "@module": path.resolve(__dirname, "src/module"),
        }
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true,
        minify: "terser",
        terserOptions: {
            keep_classnames: true,
            keep_fnames: true
        },
        lib: {
            entry: path.resolve(__dirname, "src/main.ts"),
            name: "vagabond-vtt-system",
            fileName: () => "main.js",
            formats: ["es"]
        },
        rollupOptions: {
            //input: './src/main.ts',
            external: [/^foundry/],
            output: {
                assetFileNames: (assetInfo) => {
                    console.log(assetInfo);
                    if (assetInfo.names[0] === 'vagabond-vtt-system.css') return 'styles/style.css';
                    return assetInfo.names[0]
                }
            }
        }
    },
    esbuild: {
        minifyIdentifiers: false,
        keepNames: true
    },
    server: {
        port: 30001,
        strictPort: true,
        proxy: {
            "^/systems/vagabond-vtt-system/dist": {
                target: "http://localhost:30001",
                rewrite: (path) => path.replace(/^\/systems\/vagabond-vtt-system\/dist/, "/systems/vagabond-vtt-system")
            },
            "^(?!/systems/vagabond-vtt-system(?!/lang/en\\.json$))": "http://localhost:30000/",
            "/socket.io": {
                target: "ws://localhost:30000",
                ws: true,
            },
        }
    }
});