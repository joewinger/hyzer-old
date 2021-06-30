import auth0 from 'auth0-js'
import Vue from 'vue'
import { domain, clientId } from '../../auth_config.json';

let siteUrl;
try {
    siteUrl = window.location.origin;
} catch {
    siteUrl = 'hyzer.us';
}

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
        return localStorage.getItem('id_token')
      },
      set: (id_token) => {
        localStorage.setItem('id_token', id_token)
      }
    },
    accessToken: {
      get: () => {
        return localStorage.getItem('access_token')
      },
      set: (accessToken) => {
        localStorage.setItem('access_token', accessToken)
      }
    },
    expiresAt: {
      get: () => {
        return localStorage.getItem('expires_at')
      },
      set: (expiresIn) => {
        let expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expiresAt)
      }
    },
    user: {
      get: () => {
        return JSON.parse(localStorage.getItem('user'))
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
      return new Date().getTime() < this.expiresAt && this.user
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
		try {
			if(typeof window !== 'undefined') this.handleAuthentication();
		} catch (e) {
			console.error("REEEEEEEE " + e);
		}
		// console.log("WORKING!")
  }
})

export default {
  install: function(Vue) {
    Vue.prototype.$auth = auth
  }
}