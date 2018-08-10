import './common';

import Vue from 'vue';

import './common/vue';

import './common/vuetify';
import './common/portal';

import './components/shared';

import './Todo';

import store from './store';

import App from './App.vue';

import { AuthService } from './common/Auth.service';

import './registerServiceWorker';

const app = new Vue({
  store,
  render: (h) => h(App),
});

app.$mount('#app');

AuthService.initialize().then(() => {
  if (AuthService.isAuthenticated() !== store.state.authenticated) {
    store.dispatch('auth.logout');
  }
});

if (process.env.NODE_ENV === 'development') {
  global.$app = app;
}
