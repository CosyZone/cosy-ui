import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [
		// @ts-ignore
		tailwindcss()
	],
	build: {
		cssCodeSplit: false,
		rollupOptions: {
			input: 'src/style.ts',
			output: {
				assetFileNames: 'app.css'
			}
		}
	}
});
