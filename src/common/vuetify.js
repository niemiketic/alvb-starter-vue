import Vue from 'vue';

import Vuetify from 'vuetify';

import { COLOR } from './styles';

Vue.use(Vuetify, {
  theme: {
    primary: COLOR.primary,
    secondary: COLOR.primaryDark,
    accent: COLOR.accent,
    inverse: COLOR.inverse,
    error: COLOR.error,
    success: COLOR.success,
    info: COLOR.info,
    warning: COLOR.warning,
    off: COLOR.off,
  },
});
