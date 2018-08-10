import { EventEmitter } from './events';

import { API_ENDPOINT } from './config';
import * as FetchHelper from './fetch.helper';

export const AuthServiceImplementation = class AuthService {
  events = new EventEmitter();

  username = '';

  password = '';

  token = null;

  async _loadSession() {
    this.token = localStorage.getItem('auth.token') || null;
  }

  async _saveSession(token) {
    this.token = token || null;
    localStorage.setItem('auth.token', this.token);
  }

  async _clearSession() {
    this.token = null;
    localStorage.removeItem('auth.token');
  }

  async initialize() {
    await this._loadSession();
  }

  isAuthenticated() {
    return !!this.token;
  }

  login(username, password) {
    return fetch(`${API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(async ({ token, ...result }) => {
        await this._saveSession(token);
        await this.events.emitAsync('login');
        return result;
      });
  }

  async logout() {
    await this.events.emitAsync('logout');
    await this._clearSession();
  }

  signup(payload) {
    const { name, email, password } = payload;

    const user = { name, email, password };

    return fetch(`${API_ENDPOINT}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
      }),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then(({ token, ...result }) => {
        this._saveSession(token);
        return result;
      });
  }

  initiateAccountRecovery(email) {
    return fetch(`${API_ENDPOINT}/auth/recovery/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    }).then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler);
  }
};

export const AuthService = new AuthServiceImplementation();

if (process.env.NODE_ENV === 'development') {
  global.AuthService = AuthService;
}
