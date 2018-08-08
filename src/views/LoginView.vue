
<template>

  <div class="auth-view">

    <v-form
      v-model="isValid"
      class="pt-4">

      <v-text-field
        v-model="$data.username"
        :rules="[$validate.required, $validate.email]"
        validate-on-blur
        outline
        color="white"
        placeholder="Email"
      />

      <v-text-field
        v-model="$data.password"
        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
        :rules="[$validate.required, $validate.password]"
        :type="showPassword ? 'text' : 'password'"
        i-validate-on-blur
        outline
        color="white"
        placeholder="Password"
        autocomplete="current-password"
        @click:append="showPassword = !showPassword"
      />

      <v-btn
        :loading="processing"
        :disabled="!isValid"
        class="white--text mt-2"
        block
        color="accent"
        @click="login()"
      >
        Log in
      </v-btn>
    </v-form>

    <v-layout
      class="mt-2"
      justify-space-between
      row>
      <v-btn
        class="white--text"
        right
        flat
        to="/sign-up">Sign up</v-btn>

      <v-btn
        class="white--text"
        left
        flat
        to="/recover"
        right>Recover</v-btn>
    </v-layout>

  </div>
</template>

<script>
const MODULE = 'Auth';

export default {
  data: () => ({
    username: 'nihel@gmail.com',
    password: '123456789',
    isValid: false,
    showPassword: false,
  }),

  computed: {
    processing() {
      return this.$store.state.processingByTopic[`${MODULE}.fetchData`] || false;
    },
  },

  methods: {
    login() {
      this.$store.dispatch('auth.login', {
        username: this.$data.username,
        password: this.$data.password,
      });
    },
  },
};
</script>
