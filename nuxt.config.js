const conf = require('./firebase')
const generator = require('./services/generator.js')()
let baseUrl = 'https://www.vuemastery.com'
let bots = 'index, follow'
if (conf.projectId === 'vue-mastery-staging') {
  baseUrl = 'https://vue-mastery-staging.firebaseapp.com/'
  bots = 'noindex'
}

module.exports = {
  /*
  ** Build configuration
  */
  env: {
    url: baseUrl
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue Mastery',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'robots',
        content: bots
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
   ** Global CSS
   */
  css: [
    '~/assets/css/style.styl',
    'highlight.js/styles/vs2015.css'
  ],
  /*
   ** Site Modules
   */
  modules: [
    ['@nuxtjs/pwa', { icon: false }],
    '@nuxtjs/markdownit',
    ['@nuxtjs/google-analytics', {
      id: 'UA-90157003-2'
    }],
    '@nuxtjs/toast',
    '@nuxtjs/sitemap'
  ],
  /*
  ** Render Markdown
  */
  markdownit: {
    html: true,
    linkify: true,
    typographer: true,
    injected: true,
    use: [
      'markdown-it-decorate',
      'markdown-it-highlightjs'
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#39B982' },
  /*
   ** Router config
   */
  router: {
    // middleware: 'authenticated'
  },
  plugins: [
    {
      src: '~/plugins/auth',
      ssr: false
    },
    {
      src: '~/plugins/vimeo-player',
      ssr: false
    },
    {
      src: '~/plugins/filters'
    },
    {
      src: '~/plugins/modals',
      ssr: false
    },
    {
      src: '~/plugins/social',
      ssr: false
    },
    {
      src: '~/plugins/moment',
      ssr: true
    },
    {
      src: '~/plugins/confetti',
      ssr: false
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
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'firebase',
      'firebase-auth',
      'vuexfire',
      'vue-vimeo-player'
    ],
    // put CSS in files instead of JS bundles
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Generate Sitemap
  */
  sitemap: {
    generate: true,
    hostname: baseUrl,
    routes: function () {
      return generator.then(function (result) {
        return result.sitemap
      })
    }
  },
  /*
  ** Generate Static pages
  */
  generate: {
    minify: false,
    workers: 4,
    workerConcurrency: 500,
    concurrency: 1,
    routes: function () {
      return generator.then(function (result) {
        return result.pages
      })
    }
  }
}
