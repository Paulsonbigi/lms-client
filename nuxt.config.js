import colors from 'vuetify/es5/util/colors'
// require()
export default {
  ssr: true,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - client',
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "/webfonts/sf-pro-display.ttf"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Raleway:400,600&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/mixins/validation",
    "~/plugins/mixins/axios",
    "~/plugins/mixins/user",
    { src: "plugins/modules/notification.js", ssr: false },
    { src: "plugins/modules/otp.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],


  // echo: {
  //   broadcaster: "pusher",
  //   plugins: [
  //     "~/plugins/mixins/echo.js" // create a plugin file and you can find the code in the link above
  //   ],
  //   key: process.env.PUSHER_APP_KEY,
  //   wsHost: process.env.SocketHost, // or your host domain
  //   wsPort: 443,
  //   connectOnLogin: true,
  //   disconnectOnLogout: true,
  //   authEndpoint: process.env.SockeSocketAuthEndpointtHost,
  //   authModule: true
  // },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy'
  ],

  // axios: {
  //   proxy: true,
  //   '/api/': { target: 'https://lms-servers.herokuapp.com/', pathRewrite: { '^/api/': '' } }
  // },

  // proxy: {
  //   // "/api/v1/admin/":  process.env.API_BASE ,


  // },

   axios: {
    baseURL: process.env.API_HOST
    // baseURL: "https://lms-servers.herokuapp.com"  // here set your API url
   },

  auth: {
    strategies: {
      local: {
//      scheme: "refreshes",
        token: {
          property: "token", //property name that the Back-end sends for you as a access token for saving on localStorage and cookie of user browser
          global: true,
          required: true,
          type: "Bearer"
        },
        user: {
          property: "user",
          autoFetch: true
        },
//      refreshToken: {  // it sends request automatically when the access token expires, and its expire time has set on the Back-end and does not need to we set it here, because is useless
//        property: "refresh_token", // property name that the Back-end sends for you as a refresh token for saving on localStorage and cookie of user browser
//        data: "refresh_token", // data can be used to set the name of the property you want to send in the request.
//      },
        endpoints: {
          login: { url: "/user/login", method: "post", propertyName: 'data' },
//        refresh: { url: "/api/auth/refresh-token", method: "post" },
          logout: { url: "/user/logout", method: "post" }, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          user: { url: "/user/single-user", method: "get", propertyName: false }
        }
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light:{
          primary: '#2B2862',
          secondary: '#EEF0F5',
          accent: '#518CFF',
          tertiary: '#ffffff',
          grey: '#4F4F4F'
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  generate: {
    fallback: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
