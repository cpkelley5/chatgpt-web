import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dsv from '@rollup/plugin-dsv'
import purgecss from '@fullhuman/postcss-purgecss'

const plugins = [svelte(), dsv()]

export default defineConfig(({ command, mode, ssrBuild }) => {
  const baseConfig = {
    plugins,
    build: {
      outDir: 'dist',
    },
    base: command === 'serve' ? '' : '/chatgpt-web/',
  };

  if (command === 'build') {
    return {
      ...baseConfig,
      css: {
        postcss: {
          plugins: [
            purgecss({
              content: ['./**/*.html', './**/*.svelte'],
              safelist: ['pre', 'code'],
            }),
          ],
        },
      },
    };
  } else {
    return baseConfig;
  }
});
