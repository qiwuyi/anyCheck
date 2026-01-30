import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

export default defineConfig({
  presets: [
    presetWeapp(), // unocss-preset-weapp handles most utility classes for MP
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerAttributify(),
    transformerClass(),
  ],
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75',
    'btn-primary': 'text-white bg-green-500 hover:bg-green-700 focus:ring-green-500',
    'card': 'bg-white rounded-lg shadow p-4',
  },
})
