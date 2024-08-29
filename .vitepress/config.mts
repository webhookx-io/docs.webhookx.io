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
      {
        text: 'Docs',
        link: '/docs',
        activeMatch: '/'
      },
      {
        text: 'Blog',
        link: '/blog/index',
        activeMatch: '/blog'
      },
    ],

    sidebar: {
      '/': { base: '/', items: sidebarDocs() },
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
        { text: 'Release Notes', link: 'https://github.com/webhookx-io/webhookx/releases/' }
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

