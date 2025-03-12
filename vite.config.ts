import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [
        vue(),
        dts({
            include: ['src/**/*.{ts,tsx,vue}'],
            exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
            outDir: 'dist/types',
            staticImport: true,
            insertTypesEntry: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss,
                autoprefixer,
            ],
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'CoffeeUI',
            fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                preserveModules: true,
                exports: 'named',
                sourcemap: true,
                globals: {
                    vue: 'Vue',
                },
            },
        },
        sourcemap: true,
        minify: false,
    },
}); 