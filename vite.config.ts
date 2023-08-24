import { defineConfig } from 'vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from 'rollup-plugin-polyfill-node';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis'
			},
			// Enable esbuild polyfill plugins
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
					process: true,
				}),
			],
		}
	},
	build: {
		rollupOptions: {
			// Enable rollup polyfills plugin
			// used during production bundling
			plugins: [nodePolyfills()],
		},
	},
	// resolve: {
	// 	alias: {
	// 		// process: 'process/browser',
	// 		// stream: 'stream-browserify',
	// 		util: 'util',
	// 		// zlib: 'browserify-zlib',
	// 	}
	// },
})
