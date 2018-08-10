import Vue from 'vue';
import Router from 'vue-router';

import LoginView from '~/views/LoginView.vue';
import AboutView from '~/views/AboutView.vue';
import SignupView from '~/views/SignupView.vue';
import RecoveryView from '~/views/RecoveryView';
// const LoginView = () => import(/* webpackChunkName: "LoginView" */ '~/views/LoginView.vue');
// const AboutView = () => import(/* webpackChunkName: "AboutView" */ '~/views/AboutView.vue');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: SignupView,
    },
    {
      path: '/recover',
      name: 'Recover password',
      component: RecoveryView,
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
    },
    ...(process.env.NODE_ENV === 'development'
      ? [
        {
          path: '/sample',
          name: 'SampleView',
          component: () => import(/* webpackChunkName: "SampleView" */ '~/views/SampleView.vue'),
        },
      ]
      : []),
    {
      path: '*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;

router.afterEach((to, from) => {
  document.title = `Hello World | ${to.name}`;
});
