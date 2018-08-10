
<template>

  <div class="auth-view">

    <v-form
      v-model="isValid"
      class="pt-4">
      <v-text-field
        v-model="$data.user.name"
        :rules="[$validate.required]"
        validate-on-blur
        outline
        color="white"
        placeholder="Name"
      />

      <v-text-field
        v-model="$data.user.email"
        :rules="[$validate.required, $validate.email]"
        validate-on-blur
        outline
        color="white"
        placeholder="Email"
      />

      <v-text-field
        v-model="$data.user.password"
        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
        :rules="[$validate.required, $validate.password]"
        :type="showPassword ? 'text' : 'password'"
        validate-on-blur
        outline
        color="white"
        placeholder="Password"
        autocomplete="current-password"
        @click:append="showPassword = !showPassword"
      />

      <v-btn
        :loading="$store.state.processing"
        :disabled="!isValid"
        class="white--text mt-2"
        block
        color="accent"
        @click="signup()"
      >
        Sign up
      </v-btn>
    </v-form>

    <v-layout
      class="mt-2"
      justify-space-between
      row>
      <v-btn
        class="white--text text-xs-right"
        right
        flat
        to="/login">Log in</v-btn>

      <v-btn
        class="white--text text-xs-left"
        left
        flat
        to="/recover"
        right>Recover</v-btn>
    </v-layout>

  </div>

</template>

<script>
export default {
  data: () => ({
    user: {
      name: '',
      email: '',
      password: '',
    },
    isValid: false,
    showPassword: false,
  }),
  methods: {
    signup() {
      this.$store.dispatch('auth.signup', this.$data.user);
    },
  },
};
</script>
