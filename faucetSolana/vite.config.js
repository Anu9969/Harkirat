// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      sys: 'util',
      events: path.resolve(__dirname, 'node_modules/events'),
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      querystring: 'rollup-plugin-node-polyfills/polyfills/qs',
      punycode: 'rollup-plugin-node-polyfills/polyfills/punycode',
      url: 'rollup-plugin-node-polyfills/polyfills/url',
      string_decoder: path.resolve(__dirname, 'node_modules/string_decoder'),
      http: 'rollup-plugin-node-polyfills/polyfills/http',
      https: 'rollup-plugin-node-polyfills/polyfills/http',
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      constants: 'rollup-plugin-node-polyfills/polyfills/constants',
      _stream_duplex: path.resolve(__dirname, 'node_modules/readable-stream/lib/_stream_duplex'),
      _stream_passthrough: path.resolve(__dirname, 'node_modules/readable-stream/lib/_stream_passthrough'),
      _stream_readable: path.resolve(__dirname, 'node_modules/readable-stream/lib/_stream_readable'),
      _stream_writable: path.resolve(__dirname, 'node_modules/readable-stream/lib/_stream_writable'),
      _stream_transform: path.resolve(__dirname, 'node_modules/readable-stream/lib/_stream_transform'),
      timers: 'rollup-plugin-node-polyfills/polyfills/timers',
      console: 'rollup-plugin-node-polyfills/polyfills/console',
      vm: 'rollup-plugin-node-polyfills/polyfills/vm',
      zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      tty: 'rollup-plugin-node-polyfills/polyfills/tty',
      domain: 'rollup-plugin-node-polyfills/polyfills/domain'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill()
      ]
    }
  }
})