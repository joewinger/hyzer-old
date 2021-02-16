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
          <a class="feedback" href="https://form.typeform.com/to/Dpti2OAs?typeform-medium=embed-snippet" target="_blank">Feedback</a>
        </nav>
      </div>
    </header>
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
}
</static-query>

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

  background: var(--bg-color);

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
  
  margin-left: 10px;
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
