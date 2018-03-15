let baseUrl = 'https://www.vuemastery.com'
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue Mastery',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
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
      //   hid: `og:url`,
      //   property: 'og:url',
      //   content: baseUrl
      // }, {
        hid: 'og:image',
        property: 'og:image',
        content: baseUrl + '/images/logo.png'
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
        content: baseUrl + '/images/logo.png'
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
        href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,600,700',
        rel: 'stylesheet'
      },
      {
        href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
        rel: 'stylesheet'
      },
      // Manifest
      {
        href: '/manifest.json',
        rel: 'manifest'
      },
      // Vimeo analytics
      {
        type: 'text/javascript',
        defer: 'defer',
        src: 'https://extend.vimeocdn.com/ga/72160148.js'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/style.styl'
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
    '@nuxtjs/toast'
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
      'markdown-it-decorate'
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

  generate: {
    minify: false,
    routes: function () {
      const flamelink = require('flamelink')
      const admin = require('firebase-admin')
      const serviceAccount = require('./serviceAccountKey.json')
      const firebaseConfig = {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://vue-mastery.firebaseio.com',
        storageBucket: 'vue-mastery.appspot.com'
      }
      const firebaseApp = admin.initializeApp(firebaseConfig)
      const db = flamelink({ firebaseApp, isAdminApp: true }).content
      return db.get('courses', {
        populate: [ {
          field: 'lessons',
          fields: [ 'slug' ]
        } ]})
        .then(courses => {
          let pages = []
          for (const key of Object.keys(courses)) {
            const course = courses[key]
            if (course.hasOwnProperty('lessons')) {
              for (const id of Object.keys(course.lessons)) {
                pages.push(`/courses/${course.slug}/${course.lessons[id].slug}`)
              }
            }
          }
          return pages
        })
    }
  }
}
