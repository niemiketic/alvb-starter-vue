import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import { debug } from '../common/logger';
import { AuthService } from '../common/Auth.service';

import todo from '../Todo/Todo.state';

Vue.use(Vuex);

const INITIAL_PROCESSING_STATE = {
  processingByTopic: {
    default: false,
  },
  processing: false,
  message: null,
};

/* eslint no-param-reassign: ["error", { "props": false }] */

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer({
        route, processing, navigationDrawerVisible, detailsDrawerVisible, ...state
      }) {
        return state;
      },
    }),
  ],

  modules: {
    todo,
  },

  state: {
    processing: INITIAL_PROCESSING_STATE.processing,
    processingByTopic: INITIAL_PROCESSING_STATE.processingByTopic,
    navigationDrawerVisible: false,
    detailsDrawerVisible: false,
    authenticated: false,
    user: null,
  },

  mutations: {
    processing: (
      state,
      payload = {
        value: false,
        module: 'App',
        operation: 'default',
        message: 'Loading ...',
      },
    ) => {
      const topic = `${payload.module}.${payload.operation}`;

      debug('$processing', topic, payload.message);

      const processingByTopic = {
        ...state.processingByTopic,
        [topic]: payload.value,
      };

      // debugger;

      state.processing = Object.values(processingByTopic).reduce((acc, value) => acc || value, false);
      state.processingByTopic = processingByTopic;
    },

    resetProcessing: (state) => {
      state.processing = INITIAL_PROCESSING_STATE.processing;
      state.processingByTopic = INITIAL_PROCESSING_STATE.processingByTopic;
    },

    navigationDrawerVisible: (state, value = false) => {
      state.navigationDrawerVisible = value;
    },

    detailsDrawerVisible: (state, value = false) => {
      state.detailsDrawerVisible = value;
    },

    resetDrawers: (state) => {
      state.navigationDrawerVisible = false;
      state.detailsDrawerVisible = false;
    },

    authenticated: (state, value = false) => {
      state.authenticated = value;
    },

    user: (state, value = null) => {
      state.user = value;
    },
  },

  actions: {
    'processing.start': (
      context,
      payload = {
        module: 'App',
        operation: 'default',
        message: 'Loading ...',
      },
    ) => {
      context.commit('processing', {
        value: true,
        ...payload,
      });
    },

    'processing.done': (
      context,
      payload = {
        value: false,
        module: 'App',
        operation: 'default',
        message: 'Loading ...',
      },
    ) => {
      context.commit('processing', {
        ...payload,
      });
    },

    'processing.reset': (context) => {
      context.commit('resetProcessing');
    },

    'NavigationDrawer.show': (context) => {
      debug('NavigationDrawer.show', context);
      context.commit('navigationDrawerVisible', true);
    },

    'NavigationDrawer.hide': (context) => {
      debug('NavigationDrawer.show', context);
      context.commit('navigationDrawerVisible');
    },

    'DetailsDrawer.show': (context) => {
      debug('DetailsDrawer.show', context);
      context.commit('detailsDrawerVisible', true);
    },

    'DetailsDrawer.hide': (context) => {
      debug('DetailsDrawer.show', context);
      context.commit('detailsDrawerVisible');
    },

    'auth.login': (context, { username, password }) => {
      context.dispatch('processing.start', { module: 'Auth', operation: 'login' });
      return AuthService.login(username, password)
        .then(({ user }) => {
          context.commit('user', user);
          context.commit('authenticated', true);
          return user;
        })
        .finally(() => context.dispatch('processing.done', { module: 'Auth', operation: 'login' }));
    },

    'auth.signup': (context, { name, email, password }) => {
      context.dispatch('processing.start');
      return AuthService.signup(name, email, password)
        .then(({ user }) => {
          context.commit('user', user);
          context.commit('authenticated', true);
          return user;
        })
        .finally(() => context.dispatch('processing.done'));
    },

    'auth.initiateAccountRecovery': (context, { email }) => {
      context.dispatch('processing.start');
      return AuthService.initiateAccountRecovery(email)
        .then(() => {
          context.commit('authenticated', false);
        })
        .finally(() => context.dispatch('processing.done'));
    },

    'auth.logout': (context) => {
      context.dispatch('processing.start', { module: 'Auth', operation: 'logout' });
      return AuthService.logout()
        .then(() => {

          context.commit('resetProcessing'); // TODO: NEED VALIDATION!

          context.commit('user');
          context.commit('todo');
          context.commit('authenticated');
          context.commit('resetDrawers');
        })
        .finally(() => context.dispatch('processing.done', { module: 'Auth', operation: 'logout' }));
    },
  },

  getters: {
    development: () => process.env.NODE_ENV === 'development',
  },
});

export default store;
