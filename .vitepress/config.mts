import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
  title: "WebhookX",
  description: "The Next-Generation Webhooks Gateway.",
  cleanUrls: true,
  srcExclude: [
    "README.md"
  ],
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/webhookx-io/docs.webhookx.io/edit/main/:path'
    },
    outline: {
      level: [2, 3],
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
        { text: 'Architecture', link: 'docs/architecture' },
      ]
    },
    {
      text: "Quickstart",
      items: [
        { text: 'Docker', link: 'docs/quickstart/docker' },
        { text: 'Kubernetes', link: 'docs/quickstart/kubernetes' },
        { text: 'Others', link: 'docs/quickstart/others' },
      ]
    },
    // {
    //   text: "Deployment",
    //   items: [
    //
    //   ]
    // },
    {
      text: "Admin API",
      link: 'docs/admin/overview',
      items: [
        { text: 'Entities', link: 'docs/admin/entities' },
      ]
    },
    {
      text: "Plugins",
      items: [
        { text: 'Overview', link: 'docs/plugin/index' },
        {
          text: 'Inbound Plugins',
          items: [
            { text: 'Function', link: 'docs/plugin/function' },
            { text: 'JSONSchema-Validator', link: 'docs/plugin/jsonschema-validator' },
          ]
        },
        {
          text: 'Outbound Plugins',
          items: [
            { text: 'Signature', link: 'docs/plugin/webhookx-signature' },
            { text: 'WebAssembly', link: 'docs/plugin/wasm' }
          ]
        },
      ]
    },
    {
      text: "Best Practice",
      link: 'docs/best-practice/best-practice',
    },
    {
      text: "Performance",
      items: [
        { text: 'Benchmarks', link: 'docs/benchmarks' },
      ]
    },
    {
      text: "References",
      items: [
        { text: 'Configuration', link: 'docs/configuration' },
        { text: 'CLI', link: 'docs/cli' },
        { text: 'API Reference', link: 'https://openapi.webhookx.io/' },
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

