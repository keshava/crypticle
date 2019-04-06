import getHomePageComponent from '/pages/home.js';
import getLoginPageComponent from '/pages/page-login.js';
import getSignupPageComponent from '/pages/page-signup.js';
import getDashboardPageComponent from '/pages/page-dashboard.js';

let socket = window.socket = asyngularClient.create();

let pageOptions = {
  socket
};

let PageHome = getHomePageComponent(pageOptions);
let PageDashboard = getDashboardPageComponent(pageOptions);
let PageLogin = getLoginPageComponent(pageOptions);
let PageSignup = getSignupPageComponent(pageOptions);

function isSocketAuthenticated() {
  return socket.authState === 'authenticated';
}

const Console = {
  components: {
    'page-login': PageLogin,
    'page-dashboard': PageDashboard
  },
  data: function () {
    return {
      isAuthenticated: false
    };
  },
  created: function () {
    this.isAuthenticated = isSocketAuthenticated();

    (async () => {
      for await (let event of socket.listener('authStateChange')) {
        this.isAuthenticated = isSocketAuthenticated();
      }
    })();

    this._localStorageAuthHandler = (change) => {
      // In case the user logged in from a different tab
      if (change.key === socket.options.authTokenName) {
       if (this.isAuthenticated) {
         if (!change.newValue) {
           socket.deauthenticate();
         }
       } else if (change.newValue) {
         socket.authenticate(change.newValue);
       }
      }
    };
    window.addEventListener('storage', this._localStorageAuthHandler);
  },
  destroyed: function () {
    window.removeEventListener('storage', this._localStorageAuthHandler);
  },
  template: `
    <div class="console">
      <div v-if="isAuthenticated" style="padding: 10px;">
        <router-view></router-view>
      </div>
      <div v-if="!isAuthenticated" style="padding: 10px;">
        <page-login></page-login>
      </div>
    </div>
  `
};

let routes = [
  { path: '/', component: PageHome, props: true },
  { path: '/signup', component: PageSignup, props: true },
  // { path: '/category/:categoryId/product/:productId', component: PageProductDetails, props: true }, // TODO 2
  {
    path: '/console',
    component: Console,
    props: true,
    children: [
      { path: '/', component: PageDashboard, props: true }
    ]
  }
];

let router = new VueRouter({
  routes
});

new Vue({
  el: '#app',
  router,
  data: function () {
    return {};
  },
  template: `
    <router-view></router-view>
  `
});