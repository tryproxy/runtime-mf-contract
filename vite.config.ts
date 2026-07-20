import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Relative to project root — no node:path / __dirname needed
      entry: 'src/index.ts',
      name: 'RuntimeMfContract',
      formats: ['es'],
      fileName: 'runtime-mf-contract',
    },
  },
  plugins: [
    dts({
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
});
