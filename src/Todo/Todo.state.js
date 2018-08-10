import { AuthService } from '../common/Auth.service';

import { API_ENDPOINT } from '../common/config';
import * as FetchHelper from '../common/fetch.helper';

const MODULE = 'Todo';

/* eslint no-param-reassign: ["error", { "props": false }] */

const Todo = {
  state: {
    todo: null,
  },

  mutations: {
    todo: (state, value = null) => {
      state.todo = value;
    },
  },

  actions: {
    $fetchData: (context) => {
      context.dispatch('processing.start', { module: MODULE, operation: 'fetchData' });

      return fetch(`${API_ENDPOINT}/todo`, {
        headers: {
          Authorization: `Bearer ${AuthService.token}`,
        },
      })
        .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
        .then(async ({ ...result }) => {
          const todoSet = result.todo;
          context.commit('todo', todoSet);
          return todoSet;
        })
        .finally(() => context.dispatch('processing.done', { module: MODULE, operation: 'fetchData' }));
    },

    $addData: (context, todo) => {
      context.dispatch('processing.start');

      return fetch(`${API_ENDPOINT}/todo/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AuthService.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo,
        }),
      })
        .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
        .then(async ({ ...result }) => result.todo)
        .finally(() => context.dispatch('processing.done'));
    },

    $editData: (context, todo) => {
      context.dispatch('processing.start');

      return fetch(`${API_ENDPOINT}/todo/${todo.id}/edit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AuthService.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo,
        }),
      })
        .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
        .then(async ({ ...result }) => result.todo)
        .finally(() => context.dispatch('processing.done'));
    },

    $removeData: (context, todoId) => {
      context.dispatch('processing.start');

      return fetch(`${API_ENDPOINT}/todo/${todoId}/remove`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${AuthService.token}`,
          // 'Content-Type': 'application/json',
        },
      })
        .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
        .then(async ({ ...result }) => result.todo)
        .finally(() => context.dispatch('processing.done'));
    },
  },

  getters: {},
};

export default Todo;
