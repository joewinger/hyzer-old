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
          <input type="search" name="search" class="search" v-model="query">
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
        <img class="profilepic" v-if="isAuthenticated" :src="$auth.user.picture">
        <img class="profilepic" v-else src="@/logo.svg" style="padding: 20px;">
        <h1 class="name">{{ isAuthenticated ? $auth.user.name : 'Log In' }}</h1>
        <ul class="links">
          <li v-if="isAuthenticated"><a href="#">My Profile (soon)</a></li>
          <li v-if="isAuthenticated"><a href="" @click="logout()">Log out</a></li>
          <li v-if="!isAuthenticated"><a href="" @click="login()" class="btn">Log in or Sign up!</a></li>
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
      currentDrawer: null,
      isAuthenticated: false
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
  mounted() {
    this.isAuthenticated = this.$auth.isAuthenticated();
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;

  background: var(--header-bg-color);

  width: 100%;
  box-sizing: border-box;
  height: 50px;
  padding: 5px 2em;

  box-shadow: 0 1px rgba(0, 0, 0, 0.11);

  font-size: 0.9rem;
}

.nav-content {
  width: 100%;
  max-width: var(--content-max-width);
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  text-decoration: none;
  font-style: normal;
  font-size: 2.5rem;
  color: var(--text-color);

  height: 60px;

  margin-top: 25px;
  align-self: start;
  background: #FFF;
  border-radius: 100px;
  padding: 3px;
  padding-top: 0;
  box-shadow: 0 1px rgba(0, 0, 0, 0.11);
}

.beta {
  font-size: 0.8rem;
  color: var(--beta-chip-color);
  padding: 0 5px;
  border-radius: 4px;
  border: solid 1px var(--beta-chip-color);
  box-shadow: 0 0 2px var(--beta-chip-color),
        inset 0 0 2px var(--beta-chip-color);
  
  margin-left: 5px;
}

.search {
  width: 32px;
  height: 32px;
	box-sizing: border-box;
	border: solid 1px rgba(56, 60, 79, 0.3);
	border-radius: 10000px;

  margin-right: 5px;

	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;

	font-size: 0.9rem;
  transition: width 0.3s ease-out;
  background-image: url('../../src/assets/search.svg');
  background-size: 18px;
  background-repeat: no-repeat;
  background-position-x: 6px;
  background-position-y: center;
  color: transparent;
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
  top: var(--nav-height);
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 99;
  background: rgba(56, 60, 79, 0.7);
}

.drawer {
  width: var(--content-max-width);
  padding-top: 15px;

  position: absolute;
  left: calc(50% - var(--content-max-width) / 2);
  z-index: 99;

  background: var(--header-bg-color);
  box-shadow: 0 1px rgba(0, 0, 0, 0.11);
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
  list-style: none;
  margin: 0;
  padding: 0;
}
.results-drawer .result {
  width: var(--content-max-width);
  height: var(--result-height);
}
.results-drawer .result a {
  position: relative;
  width: var(--content-max-width);
  height: 100%;
  padding: 0 30px;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  color: var(--text-color);
  text-decoration: none;
  border-bottom: dotted 1px rgba(56, 60, 79, 0.7);
  border-radius: 10px;
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
  position: absolute;
  right: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 120px;
}

.account-drawer {
  height: var(--account-drawer-height);
  overflow: hidden;
  display: grid;
  grid-template-columns: var(--account-drawer-height) 1fr;
  grid-template-rows: 50px 1fr;
}

.account-drawer .profilepic {
  box-sizing: border-box;
  width: calc(var(--account-drawer-height) - var(--account-drawer-profile-pic-padding)*2);
  justify-self: center;
  align-self: center;
  border-radius: 40%;
  grid-row: 1 / 3;
  grid-column: 1;

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.account-drawer .name {
  margin-top: calc(var(--account-drawer-profile-pic-padding) / 2);
  grid-row: 1;
  grid-column: 2;
}
.account-drawer .links {
  grid-row: 2;
  grid-column: 2;
  list-style: none;
  padding: 0;
  margin: 0;
}
.account-drawer .links a {
  text-decoration: none;
  color: inherit;
}
.account-drawer .links a.btn {
  border: solid 1px black;
  border-radius: 8px;
  padding: 6px 10px;
  margin: auto;
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
  background: var(--bg-color);
  max-width: var(--content-max-width);
  min-height: 65vh;
  padding: 0 2em;
  margin-top: 65px;
  margin-bottom: 150px;
  padding-bottom: 30px;
  z-index: 10;
  box-shadow: 0 0 5px var(--bg-color);
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  width: 100%;
  height: 150px;
  padding-top: 300px; /* So it's still black beneath content if you over scroll */
  z-index: 5;
  background: var(--footer-bg);
  color: var(--footer-text-color);
  font-family: var(--footer-font);

  font-size: 0.9em;
}

.footer > .copyright {
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.footer > .copyright > span {
  border: solid 1px var(--footer-text-color);
  line-height: 1.2;
  align-self: flex-start;
  padding: 13px 10px;
  border-radius: 10px;
}
</style>
