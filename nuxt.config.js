const conf = require('./firebase')
const generator = require('./services/generator.js')
const baseUrl = conf.baseUrl

let generatorData

module.exports = {
  /*
  ** Build configuration
  */
  env: conf,
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue Mastery',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'robots',
        content: conf.bots
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1.0'
      }, {
        hid: 'description',
        name: 'description',
        content: 'Vue Mastery is the ultimate learning resource for Vue.js developers. We release weekly video tutorials and articles as well as the proud producers of the official Vue.js News. You can consume it in newsletter and podcast format at news.vuejs.org.'
      }, {
        hid: 'keywords',
        name: 'keywords',
        content: 'vue js, vue.js, vue javascript, vue.js tutorial, vue.js components, vue.js framework, javascript, learn to code, web development, web design, vue.js plugin, vue.js api, build vue.js, vue.js syntax'
      }, {
        hid: 'og:title',
        property: 'og:title',
        content: 'Vue Mastery'
      }, {
        property: 'og:type',
        content: 'website'
      }, {
        hid: 'og:image',
        property: 'og:image',
        content: baseUrl + '/images/facbeook_image.png'
      }, {
        hid: 'og:description',
        property: 'og:description',
        content: 'Vue Mastery is the ultimate learning resource for Vue.js developers. We release weekly video tutorials and articles as well as the proud producers of the official Vue.js News. You can consume it in newsletter and podcast format at news.vuejs.org.'
      }, {
        name: 'twitter:card',
        content: 'summary_large_image'
      }, {
        name: 'twitter:site',
        content: '@vuemastery'
      }, {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Vue Mastery'
      }, {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Vue Mastery is the ultimate learning resource for Vue.js developers. We release weekly video tutorials and articles as well as the proud producers of the official Vue.js News. You can consume it in newsletter and podcast format at news.vuejs.org.'
      }, {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: baseUrl + '/images/facbeook_image.png'
      }, {
        // Android
        name: 'theme-color',
        content: '#39B982'
      }, {
        // Android
        name: 'mobile-web-app-capable',
        content: 'yes'
      }, {
        // iOS
        name: 'apple-mobile-web-app-title',
        content: 'Application Title'
      }, {
        // iOS
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      }, {
        // iOS
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default'
      }, {
        // Windows
        name: 'msapplication-navbutton-color',
        content: '#39B982'
      }, {
        // Windows
        name: 'msapplication-TileColor',
        content: '#39B982'
      }, {
        // Windows
        name: 'msapplication-TileImage',
        content: baseUrl + '/icons/mstile-144x144.png'
      }, {
      // Windows
      //   hid: 'msapplication-config',
      //   name: 'msapplication-config',
      //   content: '/browserconfig.xml'
      // }, {
        name: 'msapplication-square70x70logo',
        content: baseUrl + '/icons/mstile-70x70.png'
      }, {
        name: 'msapplication-square150x150logo',
        content: baseUrl + '/icons/mstile-150x150.png'
      }, {
        name: 'msapplication-wide310x150logo',
        content: baseUrl + '/icons/mstile-310x150.png'
      }, {
        name: 'msapplication-square310x310logo',
        content: baseUrl + '/icons/mstile-310x310.png'
      }, {
        // Pinned Sites
        name: 'application-name',
        content: 'Vue Mastery'
      }, {
        // Pinned Sites
        name: 'msapplication-tooltip',
        content: 'Vue Mastery is the ultimate learning resource for Vue.js developers. We release weekly video tutorials and articles as well as the proud producers of the official Vue.js News. You can consume it in newsletter and podcast format at news.vuejs.org.'
      }, {
        // Pinned Sites
        name: 'msapplication-starturl',
        content: '/'
      }, {
        // Tap highlighting
        name: 'msapplication-tap-highlight',
        content: 'no'
      }, {
        // UC Mobile Browser
        name: 'full-screen',
        content: 'Yes'
      }, {
        // UC Mobile Browser
        name: 'browsermode',
        content: 'application'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: baseUrl + '/icons/favicon.ico' },
      // Main Link Tags
      {
        href: baseUrl + '/icons/favicon-16x16.png',
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16'
      }, {
        href: baseUrl + '/icons/favicon-32x32.png',
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32'
      }, {
        href: baseUrl + '/icons/favicon-48x48.png',
        rel: 'icon',
        type: 'image/png',
        sizes: '48x48'
      },
      // iOS
      {
        rel: 'apple-touch-icon-precomposed',
        sizes: '57x57',
        href: baseUrl + '/icons/apple-touch-icon-57x57.png'
      }, {
        rel: 'apple-touch-icon-precomposed',
        sizes: '114x114',
        href: baseUrl + '/icons/apple-touch-icon-114x114.png'
      }, {
        rel: 'apple-touch-icon-precomposed',
        sizes: '72x72',
        href: baseUrl + '/icons/apple-touch-icon-72x72.png'
      }, {
        rel: 'apple-touch-icon-precomposed',
        sizes: '144x144',
        href: baseUrl + '/icons/apple-touch-icon-144x144.png'
      }, {
        rel: 'apple-touch-icon-precomposed',
        sizes: '60x60',
        href: baseUrl + '/icons/apple-touch-icon-60x60.png'
      }, {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: baseUrl + '/icons/apple-touch-icon-120x120.png'
      }, {
        rel: 'apple-touch-icon-precomposed',
        sizes: '76x76',
        href: baseUrl + '/icons/apple-touch-icon-76x76.png'
      }, {
        rel: 'apple-touch-icon-precomposed',
        sizes: '152x152',
        href: baseUrl + '/icons/apple-touch-icon-152x152.png'
      },
      // Pinned Tab
      {
        href: baseUrl + '/images/logo.png',
        rel: 'mask-icon',
        size: 'any',
        color: '#39B982'
      },
      // Android
      {
        rel: 'icon',
        type: 'image/png',
        href: baseUrl + '/icons/favicon-196x196.png',
        sizes: '196x196'
      }, {
        rel: 'icon',
        type: 'image/png',
        href: baseUrl + '/icons/favicon-96x96.png',
        sizes: '96x96'
      }, {
        rel: 'icon',
        type: 'image/png',
        href: baseUrl + '/icons/favicon-32x32.png',
        sizes: '32x32'
      }, {
        rel: 'icon',
        type: 'image/png',
        href: baseUrl + '/icons/favicon-16x16.png',
        sizes: '16x16'
      }, {
        rel: 'icon',
        type: 'image/png',
        href: baseUrl + '/icons/favicon-128.png',
        sizes: '128x128'
      },
      // CSS
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/normalize.css'
      },
      // Fonts
      {
        href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,600,700|Inconsolata',
        rel: 'stylesheet'
      },
      {
        href: 'https://use.fontawesome.com/releases/v5.0.10/css/all.css',
        rel: 'stylesheet',
        integrity: 'sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg',
        crossorigin: 'anonymous'
      },
      // Manifest
      {
        href: '/manifest.json',
        rel: 'manifest'
      }
    ],
    script: [
      // Vimeo analytics
      {
        type: 'text/javascript',
        defer: 'defer',
        src: 'https://extend.vimeocdn.com/ga/72160148.js'
      },
      // Chargebee
      {
        type: 'text/javascript',
        defer: 'defer',
        src: 'https://js.chargebee.com/v2/chargebee.js'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#39B982' },
  /*
   ** Site Modules
   */
  modules: [
    ['@nuxtjs/google-tag-manager', {
      id: 'GTM-5DMGGN2'
    }],
    ['@nuxtjs/pwa', { icon: false }],
    '@nuxtjs/markdownit',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
    '@nuxtjs/style-resources',
    '@nuxtjs/toast',
    ['nuxt-facebook-pixel-module', {
      track: 'PageView',
      pixelId: '790526371136735'
    }],
    ['nuxt-twitter-pixel-module', {
      track: 'PageView',
      pixelId: 'nzno2'
    }],
    ['@nuxtjs/style-resources']
  ],
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/style.styl',
    'highlight.js/styles/vs2015.css'
  ],
  /*
   ** Global style Ressource
   */
  styleResources: {
    stylus: [
      'assets/css/_mixins.styl',
      'assets/css/_variables.styl'
    ]
  },
  /*
  ** Render Markdown
  */
  markdownit: {
    html: true,
    linkify: true,
    typographer: true,
    injected: true,
    use: [
      // 'markdown-it-anchor',
      'markdown-it-decorate',
      'markdown-it-highlightjs'
    ]
  },
  plugins: [
    {
      src: '~/plugins/dateFormat'
    },
    {
      src: '~/plugins/auth',
      mode: 'client'
    },
    {
      src: '~/plugins/confetti',
      mode: 'client'
    },
    {
      src: '~/plugins/filters'
    },
    {
      src: '~plugins/ga.js',
      mode: 'client'
    },
    {
      src: '~/plugins/modals',
      mode: 'client'
    },
    {
      src: '~/plugins/vimeo-player',
      mode: 'client'
    },
    {
      src: '~/plugins/social',
      mode: 'client'
    },
    {
      src: '~/plugins/skrollr',
      mode: 'client'
    }
  ],
  /*
  ** Taost conf
  */
  toast: {
    position: 'top-center'
  },
  /*
  ** Page transition
  */
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  /*
  ** Build configuration
  */
  build: {
    // quiet: false,
    // analyze: true,
    // /*
    // ** Run ESLint on save
    // */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    transpile: ['vue-instantsearch', 'instantsearch.js/es']
  },
  /*
  ** Generate Sitemap
  */
  sitemap: {
    hostname: baseUrl,
    routes: async () => {
      if (!generatorData) {
        generatorData = await generator()
      }
      return generatorData.sitemap
    }
  },
  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      async create (feed) {
        if (!generatorData) {
          generatorData = await generator()
        }

        feed.options = {
          title: 'Vue Mastery Blog',
          link: 'https://www.vuemastery.com/feed.xml',
          description: 'Vue Mastery is the ultimate learning resource for Vue.js developers. We release weekly video tutorials and articles as well as the proud producers of the official Vue.js News. You can consume it in newsletter and podcast format at news.vuejs.org.',
          generator: 'Nuxt from custom Vue Mastery build',
          image: {
            url: `${baseUrl}/images/facbeook_image.png`,
            link: 'https://www.vuemastery.com/feed.xml',
            title: 'Vue Mastery Blog'
          }
        }

        const posts = generatorData.feed
        posts.forEach(post => {
          post.link = baseUrl + post.link
          feed.addItem(post)
        })

        feed.addCategory('Vue Mastery') // Change later if we add categories

        feed.addContributor({
          name: 'Vue Mastery',
          email: 'team@vuemastery.com',
          link: 'https://www.vuemastery.com/'
        })
      },
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2' // Can be: rss2, atom1, json1
    }
  ],
  /*
  ** Generate Static pages
  */
  generate: {
    workers: 4,
    workerConcurrency: 500,
    concurrency: 1,
    routes: async () => {
      if (!generatorData) {
        generatorData = await generator()
      }
      console.log('Route generated. Env:', process.server)
      return generatorData.pages
    }
  }
}
