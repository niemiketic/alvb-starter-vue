<template>
  <div class="auth-view">

    <v-form
      v-model="isValid"
      class="pt-4">
      <v-text-field
        v-model="$data.email"
        :rules="[$validate.required, $validate.email]"
        validate-on-blur
        outline
        color="white"
        placeholder="Email"
      />

      <v-btn
        :loading="$store.state.processing"
        :disabled="!isValid"
        class="white--text mt-2"
        block
        color="accent"
        @click="initiateAccountRecovery()"
      >
        Recover my account
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
        to="/sign-up"
        right>Sign up</v-btn>
    </v-layout>

  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    isValid: false,
  }),
  methods: {
    initiateAccountRecovery() {
      this.$store.dispatch('auth.initiateAccountRecovery', {
        email: this.$data.email,
      });
      this.$router.push('/');
    },
  },
};
</script>
