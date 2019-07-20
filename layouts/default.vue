<template>
  <div>
    <navigation></navigation>
    <nuxt />
    <modal v-if="getModal"></modal>
    <div class="overlay" v-if="getModal" @click="closeModal"></div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Modal from '@/components/Modal'
export default {
  components: {
    Navigation,
    Modal
  },
  methods: {
    closeModal() {
      this.$store.commit('modal/CHANGE_VALUE')
    }
  },
  computed: {
    getModal() {
      return this.$store.getters['modal/changeModal']
    }
  }
}
</script>

<style>
html {
  background: linear-gradient(to right, rgb(252, 204, 141), rgb(244, 232, 188));
}
.overlay {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: grey;
  z-index: 9;
  opacity: 0.5;
}
</style>

