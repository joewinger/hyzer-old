import auth0 from 'auth0-js'
import Vue from 'vue'
// import { domain, clientId } from '../../auth_config.json';
const domain = 'hyzer.us.auth0.com';
const clientId = 'G1gEBV3V9CRTwIWxVfhSpJFUOdcB1qOQ';


let isBrowser;
try {
  isBrowser = typeof window !== 'undefined';
} catch {
  isBrowser = false;
}

let siteUrl = isBrowser ? window.location.origin : 'hyzer.us';

// Source: https://github.com/bitcoinvsalts/gridsome-auth0-starter/blob/master/src/plugins/auth.js

let webAuth = new auth0.WebAuth({
  domain: domain,
  clientID: clientId,
  redirectUri: `${siteUrl}`,
  audience: `https://${domain}/api/v2/`,
  responseType: 'token id_token',
  scope: 'openid email profile'
})

let auth = new Vue({
  computed: {
    token: {
      get: () => {
        return isBrowser ? localStorage.getItem('id_token') : false
      },
      set: (id_token) => {
        localStorage.setItem('id_token', id_token)
      }
    },
    accessToken: {
      get: () => {
        return isBrowser ? localStorage.getItem('access_token') : false
      },
      set: (accessToken) => {
        localStorage.setItem('access_token', accessToken)
      }
    },
    expiresAt: {
      get: () => {
        return isBrowser ? localStorage.getItem('expires_at') : false
      },
      set: (expiresIn) => {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expiresAt)
      }
    },
    user: {
      get: () => {
        return isBrowser ? JSON.parse(localStorage.getItem('user')) : false;
      },
      set: (user) => {
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  },
  methods: {
    login() {
      webAuth.authorize()
    },
    logout() {
      return new Promise((resolve, reject) => { 
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('user')
        webAuth.logout({
          returnTo: siteUrl,
          clientID: clientId, // Your client ID
        })
      })
    },
    isAuthenticated() {
      return isBrowser ? new Date().getTime() < this.expiresAt && this.user : false;
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {  
        webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = authResult.expiresIn
            this.accessToken = authResult.accessToken
            this.token = authResult.idToken
            this.user = authResult.idTokenPayload
            resolve()
          } 
          else if (err) {
            this.logout()
            reject(err)
          }
        })
      })
    }
  },
  async created() {
		if(isBrowser) this.handleAuthentication();
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$auth = auth
  }
}