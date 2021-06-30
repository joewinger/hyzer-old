// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/global.css'
import '~/assets/variables.css'
import AuthPlugin from '~/plugins/auth'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  Vue.use(AuthPlugin);

  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover'
  });

  head.link.push({
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com'
  });
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;800&display=swap'
  });
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap'
  });

  head.link.push({
    rel: 'stylesheet',
    href: 'https://use.typekit.net/axc0gpu.css' // 'ht neon'
  })
}
