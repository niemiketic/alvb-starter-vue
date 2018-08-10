import Vue from 'vue';

import { COLOR } from './styles';

import * as validate from './validate';

Vue.config.productionTip = false;

Vue.config.ignoredElements = [/^.*-view$/, /^x-.*$/];

Vue.config.errorHandler = function VueErrorHandler(err, vm, info) {
  console.error(err, vm, info);
};

Vue.prototype.$COLOR = COLOR;
Vue.prototype.$validate = validate;
