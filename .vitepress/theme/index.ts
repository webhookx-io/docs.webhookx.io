import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import { theme, useOpenapi } from 'vitepress-openapi/client';
import 'vitepress-openapi/dist/style.css';
import spec from '../../docs/openapi/openapi.json' with { type: 'json' };

export default {
  ...DefaultTheme,
  async enhanceApp({ app, router, siteData }) {
    const openapi = useOpenapi({
      spec: spec,
      config: {},
    });

    theme.enhanceApp({ app, openapi });
  },
} satisfies Theme;
