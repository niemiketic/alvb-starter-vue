<template>
  <div class="-x-view -x-view-content">
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: 'AboutView',

  data: () => ({
    message: 'This is an about page',
  }),
};
</script>
