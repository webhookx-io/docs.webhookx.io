import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "WebhookX",
  description: "A modern webhooks gateway.",
  srcExclude: [
    "README.md"
  ],
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/webhookx-io/docs.webhookx.io/edit/main/:path'
    },

    nav: [
      { text: 'Docs', link: '/docs-index' },
    ],

    sidebar: [
      {
        text: "Introduction",
        collapsed: false,
        items: [
          { text: 'Overview', link: 'introduction/overview' }
        ]
      },
      {
        text: "Install WebhookX",
        collapsed: true,
        items: [
          { text: 'Docker', link: 'install/docker' },
          // { text: 'Kubernetes', link: 'install/kubernetes' },
          // { text: 'Linux', link: 'install/linux' },
        ]
      },
      {
        text: "Deployment",
        collapsed: false,
        items: [
          { text: 'Configuration', link: 'configuration' },
        ]
      },
      {
        text: "Admin API",
        collapsed: false,
        items: [
          { text: 'Overview', link: 'admin/overview' },
        ]
      },
      {
        text: "Others",
        collapsed: false,
        items: [
          // { text: 'Glossary', link: 'glossary' },
          { text: 'Release Notes', link: 'https://github.com/webhookx-io/webhookx/releases/' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/webhookx-io/webhookx' },
      { icon: 'x', link: 'https://x.com/WebhookX' },
      { icon: 'slack', link: 'https://join.slack.com/t/webhookx/shared_invite/zt-2o4b6hv45-mWm6_WUcQP9qEf1nOxhrrg' },
    ]
  }
})
