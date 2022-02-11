<template>
  <v-app>
        <nuxt keep-alive />
        <notifications   position="bottom center" group="auth" max="1"/>
        <notifications  position="bottom center" group="all" max="1"/>
        <notifications   position="bottom center" group="foo" max="1"/>
        <!-- 100% REUSEABLE COMPONENTS  -->
  </v-app>
</template>
<script>
export default {
  mounted() {
  },
};
</script>

<style scoped>
.half-bg {
  background-color: #f2f2f2 !important;
}
</style>