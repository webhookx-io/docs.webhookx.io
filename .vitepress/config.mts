import { defineConfig, type DefaultTheme } from 'vitepress'

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
      {
        text: 'Documentation',
        link: '/docs/index',
        activeMatch: '/docs'
      },
      {
        text: 'Blog',
        link: '/blog/index',
        activeMatch: '/blog'
      },
    ],

    sidebar: {
      '/docs/': { base: '', items: sidebarDocs() },
      '/blog/': { base: '/blog/', items: sidebarBlog() }
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/webhookx-io/webhookx' },
      { icon: 'x', link: 'https://x.com/WebhookX' },
      { icon: 'slack', link: 'https://join.slack.com/t/webhookx/shared_invite/zt-2o4b6hv45-mWm6_WUcQP9qEf1nOxhrrg' },
    ]
  }
})


function sidebarDocs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Home",
      items: [
        { text: 'Overview', link: 'docs/index' },
      ]
    },
    {
      text: "Install WebhookX",
      collapsed: false,
      items: [
        { text: 'Docker', link: 'docs/install/docker' },
      ]
    },
    {
      text: "Deployment",
      collapsed: false,
      items: [
        { text: 'Configuration', link: 'docs/configuration' },
      ]
    },
    {
      text: "Admin API",
      collapsed: false,
      items: [
        { text: 'Overview', link: 'docs/admin/overview' },
      ]
    },
    {
      text: "References",
      items: [
        { text: 'CLI', link: 'docs/cli' },
        { text: 'OpenAPI', link: 'https://github.com/webhookx-io/webhookx/blob/main/openapi.yml' },
        { text: 'Release Notes', link: 'https://github.com/webhookx-io/webhookx/releases' },
      ]
    },
  ]
}


function sidebarBlog(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Category",
      link: 'index',
      items: [
        { text: 'Releases', link: 'releases/index' },
        { text: 'News', link: 'news/index' },
        { text: 'Engineering', link: 'engineering/index' },
      ]
    },
  ]
}

