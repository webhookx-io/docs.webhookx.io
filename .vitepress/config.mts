import { defineConfig, type DefaultTheme } from 'vitepress';
import { useSidebar } from 'vitepress-openapi';
import spec from '../docs/openapi/openapi.json' with { type: 'json' };

const sidebar = useSidebar({
  spec,
  // Optionally, you can specify a link prefix for all generated sidebar items.
  linkPrefix: '/operations/',
})

export default defineConfig({
  title: "WebhookX",
  description: "A modern webhooks gateway.",
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
      '/blog/': { base: '/blog/', items: sidebarBlog() },
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/webhookx-io/webhookx' },
      { icon: 'x', link: 'https://x.com/WebhookX' },
      { icon: 'slack', link: 'https://join.slack.com/t/webhookx/shared_invite/zt-2o4b6hv45-mWm6_WUcQP9qEf1nOxhrrg' },
    ]
  },
  /** Give each dynamic page its own <title> */
  transformPageData(pageData) {
    // params returned from [*].paths.js|ts are available here
    const pageTitle = pageData.params?.pageTitle;

    if (pageTitle) {
      pageData.title = pageTitle;
      pageData.frontmatter ??= {};
      pageData.frontmatter.title = pageTitle;
    }
  },
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
      text: "Install",
      link: 'docs/install/index',
      items: [
        { text: 'WebhookX', link: 'docs/install/index' },
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
      text: 'OpenAPI',
      collapsed: false,
      items: [
        {
          text: 'Overview',
          link: '/docs/openapi/overview',
        },
        ...sidebar.generateSidebarGroups({
          linkPrefix: '/docs/openapi/operations/',
        }).map((group) => ({
          ...group,
          collapsed: true
        })),
        {
          text: 'One Page',
          link: '/docs/openapi/one-page',
        },
      ],
    },
    {
      text: "Plugins",
      items: [
        { text: 'Overview', link: 'docs/plugin/index' },
        {
          text: 'Inbound Plugins',
          items: [
            { text: 'Function', link: 'docs/plugin/function' }
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
      text: "References",
      items: [
        { text: 'CLI', link: 'docs/cli' },
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
