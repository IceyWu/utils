import fg from 'fast-glob'
import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress/types'

// import { version } from '../../package.json'
const version = '0.0.1'

const ogUrl = 'https://unocss.dev/'
const ogImage = `${ogUrl}og.png#1`
const title = '@iceywu/utils'
const description = 'nothing to use 🧪'

// 指定hooks顺序
export const hooks = [
  'useECharts',
  'useDraggable',
  'useWatermark',
  'useDark',
  'useScrollTo',
  'useLoader',
  'useCopyToClipboard',
  'useGlobal',
]
// sortHooks(getItems("hooks"))
console.log(
  '🎉-----sortHooks(getItems("hooks"))-----',
  sortHooks(getItems('hooks')),
)

function getItems(path: string) {
  const links: DefaultTheme.SidebarItem[] = []
  fg.sync(`${path}/*`, {
    onlyDirectories: true,
    objectMode: true,
  }).forEach(({ name }) => {
    links.push({
      text: name,
      link: `/${path}/${name}/${name}`,
    })
  })
  return links
}

function sortHooks(list: DefaultTheme.SidebarItem[]) {
  console.log('🐠------------------------------>')
  return hooks
    .map((hook) => {
      return list.map((l) => {
        return hook === l.text ? l : ''
      })
    })
    .flat()
    .filter(Boolean)
}

const Start: DefaultTheme.NavItemWithLink[] = [
  { text: '快速开始', link: '/guide/guide' },
]
const Hooks: DefaultTheme.NavItemWithLink[] = [
  // { text: "useDark", link: "/hooks/" },
  {
    text: 'Overview',
    link: '/integrations/',
  },
  {
    text: 'Examples',
    link: '/integrations/#examples',
  },
  {
    text: 'useDark',
    link: '/hooks/useDark/',
  },
]
const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/' },
  { text: 'Why @iceywu/utils?', link: '/guide/why' },
  { text: 'Utils', link: '/utils/' },
]

const Nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    items: [
      {
        text: 'Guide',
        items: Guides,
      },
    ],
    activeMatch: '^/guide/',
  },

  { text: 'Playground', link: '/play/', target: '_blank' },
  {
    text: `v${version}`,
    items: [
      {
        text: 'Release Notes',
        link: 'https://github.com/IceyWu/utils/releases',
      },
      {
        text: 'Contributing',
        link: 'https://github.com/IceyWu/utils/blob/main/CONTRIBUTING.md',
      },
    ],
  },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: '介绍',
    items: Start,
  },
  {
    text: `Hooks（${getItems('hooks').length}）`,
    // items: Hooks,
    items: sortHooks(getItems('hooks')),
  },
  {
    text: `Utils（${getItems('utils').length}）`,

    items: getItems('utils'),
  },
]

export default defineConfig({
  lang: 'en-US',
  title,
  titleTemplate: title,
  description,
  outDir: './dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    [
      'link',
      {
        rel: 'alternate icon',
        href: '/favicon.ico',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@antfu7' }],
    ['meta', { name: 'twitter:url', content: ogUrl }],
    [
      'link',
      {
        rel: 'search',
        type: 'application/opensearchdescription+xml',
        href: '/search.xml',
        title: '@iceywu/utils',
      },
    ],
  ],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [/^\/play/, /^\/interactive/, /:\/\/localhost/],

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: Nav,
    search: {
      provider: 'local',
    },
    sidebar: {
      '/guide/': SidebarGuide,
      // "/integrations/": SidebarGuide,
      '/hooks/': SidebarGuide,
      '/utils/': SidebarGuide,
    },
    editLink: {
      pattern: 'https://github.com/IceyWu/utils/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IceyWu/utils' },
      { icon: 'discord', link: 'https://github.com/IceyWu' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT Icey wu',
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
    },
  },
})
