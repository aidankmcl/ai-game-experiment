import { defineConfig, presetIcons, presetUno, presetWebFonts, toEscapedSelector } from 'unocss'

import { colors } from './src/ui/constants';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({}),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        sans: 'Josefin Sans',
        yeseva: 'Yeseva One',
      },
    })
  ],
  theme: {
    colors,
  },
  rules: [
    [/^f-s-(\d+)$/, ([_, scale]) => {
      const scales = [2.5, 1.5, 1.25];
      return { 'font-size': `${scales[Number(scale)]}rem`, 'line-height': 1.15 };
    }],
    [/^card-?(.+)?$/, ([_, scale], { theme, rawSelector }) => {
      const sel = toEscapedSelector(rawSelector);

      const size = (scale === "l") ? 16 : 8;

      return `
        ${sel} {
          margin: ${size}px;
          box-shadow: ${size}px ${size}px 0px 0px ${theme.colors.purple};
          transition: all 0.1s linear;
        }

        ${sel}:hover {
          box-shadow: 0px 0px 0px ${size / 2}px ${theme.colors.purple};
        }
      `;
    }]
  ]
})