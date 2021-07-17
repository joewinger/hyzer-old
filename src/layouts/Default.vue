<template>
  <div class="layout">
    <header class="header">
      <div class="nav-content">
        <div class="nav-left">
          <g-link to="/" class="logolink">
            <img src="@/logo.svg" alt="H" class="logo">
          </g-link>
          <div class="beta">beta</div>
        </div>
        <nav class="nav-right">
          <!-- <g-link class="nav__link" to="/about/">About</g-link> -->
          <!-- <a class="feedback" href="https://form.typeform.com/to/Dpti2OAs?typeform-medium=embed-snippet" target="_blank">Feedback</a> -->
          <input type="search" name="search" class="search" @focus="query=''" v-model="query">
          <div class="account" @click="currentDrawer = 'account'"></div>
        </nav>
      </div>
    </header>
    <div class="drawer-wrapper" @click="currentDrawer=null" v-if="currentDrawer!==null">
      <div class="drawer results-drawer" v-if="currentDrawer==='searchresults'">
        <ol v-if="results !== null" class="results">
          <li v-for="result in results" :key="result.id" class="result">
				    <g-link :to="`/disc/${result.node.slug}/`">
              <span class="name">{{result.node.name}}</span>
              <span class="manufacturer">{{result.node.manufacturer.name}}</span>
              <ol class="numbers">
                <div class="number">{{result.node.speed}}</div>
                <div class="number">{{result.node.glide}}</div>
                <div class="number">{{result.node.turn}}</div>
                <div class="number">{{result.node.fade}}</div>
              </ol>
            </g-link>
          </li>
        </ol>
      </div>
      <div class="drawer account-drawer" v-if="currentDrawer==='account'">
        <img class="profilepic" v-if="this.$auth.isAuthenticated()" :src="$auth.user.picture">
        <img class="profilepic" v-else src="@/logo.svg" style="padding: 20px;">
        <h1 class="name">{{ this.$auth.isAuthenticated() ? $auth.user.name : 'Log In' }}</h1>
        <ul class="links">
          <li v-if="this.$auth.isAuthenticated()"><g-link to="/profile">Edit Profile</g-link></li>
          <li v-if="this.$auth.isAuthenticated()"><a href="" @click="logout()">Log out</a></li>
          <li v-if="!this.$auth.isAuthenticated()"><a href="" @click="login()" class="btn">Log in or Sign up!</a></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
    <footer class="footer">
      <div class="copyright">
        <span>&copy;<br>2021<br>hyzer.us</span>
      </div>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
	discs: allDisc {
		edges {
			node {
				id
				name
				slug
        manufacturer {
          name
        }
        speed
        glide
        turn
        fade
			}
		}
	}
}
</static-query>

<script>
export default {
  data: function() {
    return {
      query: '',
      currentDrawer: null
    }
  },
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logout();
    }
  },
  computed: {
    results: function() {
      if(this.query === '') return;
      else this.currentDrawer = 'searchresults';

      return this.$static.discs.edges.filter(disc => !disc.node.name.toLowerCase().indexOf(this.query.toLowerCase()));
    }
  },
  watch: {
    query: function(val) {
      if (val !== null) this.currentDrawer = 'searchresults'
      else if (val === '') this.currentDrawer = null;
    }
  }
}
</script>

<style>
.layout {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;

  width: 100%;
  height: 50px;
  padding: 5px 2em;
  box-sizing: border-box;

  background: var(--header-bg-color);
  box-shadow: 0 1px rgba(0, 0, 0, 0.11);

  font-size: 0.9rem;

  z-index: 100;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  width: 100%;
  max-width: var(--content-max-width);
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
}
.nav-left {
  justify-content: flex-start;
}
.nav-right {
  justify-content: flex-end;
}

.logo {
  align-self: start;
  
  height: 60px;
  margin-top: 25px;
  padding: 3px;
  padding-top: 0;

  background: #FFF;
  border-radius: 100px;
  box-shadow: 0 1px rgba(0, 0, 0, 0.11);

  font-family: 'Inter', sans-serif;
  font-weight: 800;
  text-decoration: none;
  font-style: normal;
  font-size: 2.5rem;
  color: var(--text-color);
}

.beta {
  padding: 0 5px;
  margin-left: 5px;

  border-radius: 4px;
  border: solid 1px var(--beta-chip-color);
  box-shadow: 0 0 2px var(--beta-chip-color),
        inset 0 0 2px var(--beta-chip-color);
  
  font-size: 0.8rem;
  color: var(--beta-chip-color); 
}

.search {
  width: 32px;
  height: 32px;
  margin-right: 5px;

	box-sizing: border-box;
	border: solid 1px rgba(56, 60, 79, 0.3);
	border-radius: 10000px;

  background-image: url('../../src/assets/search.svg');
  background-size: 18px;
  background-repeat: no-repeat;
  background-position-x: 6px;
  background-position-y: center;

	font-size: 0.9rem;
  color: transparent;

  transition: width 0.3s ease-out;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
}
.search:focus {
  width: calc(100% - 45px);
  padding-left: 28px;
  
	outline: 0;

  color: var(--text-color);
	/* box-shadow: 0 0 0 1px rgba(56, 60, 79, 0.4); */
}

.account {
  width: 32px;
  height: 32px;
	
  box-sizing: border-box;
	border: solid 1px rgba(56, 60, 79, 0.3);
	border-radius: 100%;
  
  background-image: url('../../src/assets/user.svg');
  background-size: 18px;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}

.drawer-wrapper {
  position: fixed;
  top: var(--nav-height);

  width: 100%;
  height: 100%;
  
  background: rgba(56, 60, 79, 0.7);
  
  z-index: 99;
}

.drawer {
  position: absolute;
  left: calc(50% - var(--content-max-width) / 2);
  
  width: var(--content-max-width);
  padding-top: 15px;

  background: var(--header-bg-color);
  box-shadow: 0 1px rgba(0, 0, 0, 0.11);
  
  z-index: 99;
}
@media screen and (min-width: 450px) {
  .drawer {
    border-radius: 0 0 15px 15px;
  }
}
.results-drawer {
  min-height: var(--results-drawer-min-height);
  max-height: var(--results-drawer-max-height);
  overflow: scroll;

  /* box-shadow: 0px 0px 1000px 1000px rgba(56, 60, 79, 0.8); */
}

.results-drawer .results {
  margin: 0;
  padding: 0;

  list-style: none;
}
.results-drawer .result {
  width: var(--content-max-width);
  height: var(--result-height);
}
.results-drawer .result a {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  width: var(--content-max-width);
  height: 100%;
  padding: 0 30px;
  box-sizing: border-box;

  border-bottom: dotted 1px rgba(56, 60, 79, 0.7);
  border-radius: 10px;

  color: var(--text-color);
  text-decoration: none;
}
.results-drawer .result a:hover {
  background: rgba(0, 0, 0, 0.11);
}
.results-drawer .result a .name {
  font-weight: bold;
  margin-right: 8px;
}
.results-drawer .result a .manufacturer {
  font-size: 0.8em;
  font-style: italic;
}
.results-drawer .result a .numbers {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  right: 30px;

  width: 120px;
  margin: 0;
  padding: 0;

  list-style: none;
}

.account-drawer {
  display: grid;
  grid-template-columns: var(--account-drawer-height) 1fr;
  grid-template-rows: 50px 1fr;

  height: var(--account-drawer-height);
  overflow: hidden;
}

.account-drawer .profilepic {
  justify-self: center;
  align-self: center;
  grid-row: 1 / 3;
  grid-column: 1;

  width: calc(var(--account-drawer-height) - var(--account-drawer-profile-pic-padding)*2);
  box-sizing: border-box;
  
  border-radius: 40%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.account-drawer .name {
  grid-row: 1;
  grid-column: 2;

  margin-top: calc(var(--account-drawer-profile-pic-padding) / 2);
}
.account-drawer .links {
  grid-row: 2;
  grid-column: 2;

  padding: 0;
  margin: 0;
  
  list-style: none;
}
.account-drawer .links a {
  text-decoration: none;
  color: inherit;
}
.account-drawer .links a.btn {
  padding: 6px 10px;
  margin: auto;
  
  border: solid 1px black;
  border-radius: 8px;
}

.feedback {
  color: var(--text-color);
  border-bottom: dotted 1px var(--text-color);
  text-decoration: none;
}

.nav__link {
  margin-left: 20px;
}

.content {
  position: relative;
  z-index: 10;

  width: var(--content-max-width);
  min-height: 65vh;
  padding: 32px;
  padding-top: 0;
  margin: var(--nav-height) 0 150px;
  box-sizing: border-box;

  background: var(--bg-color);
}

.footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: fixed;
  bottom: 0;
  left: 0;

  padding: 20px;
  width: 100vw;
  height: 400px;

  background: var(--footer-bg);

  font-family: var(--footer-font);
  font-size: 0.9em;
  color: var(--footer-text-color);
  
  z-index: 5;
}

.footer > .copyright {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.footer > .copyright > span {
  align-self: flex-start;
  
  padding: 13px 10px;
  
  border: solid 1px var(--footer-text-color);
  border-radius: 10px;
  
  line-height: 1.2;
}
</style>
