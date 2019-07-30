<template>
  <div class="navbar is-dark is-fixed-top">
    <div class="container">
      <div class="navbar-menu">
        <div class="navbar-brand">
          <span class="navbar-item" style="font-weight:bold;">DRINKING TIME</span>
        </div>
        <div class="navbar-end">
          <div v-show="favorite > 0" class="navbar-item fav" @click="activeModal()">Fav: {{favorite}}</div>
          <nuxt-link to="/" class="navbar-item">Home</nuxt-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">More</a>
            <div class="navbar-dropdown">
              <nuxt-link to="/search" class="navbar-item">Search</nuxt-link>
              <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
              <nuxt-link to="/cocktail_form" class="navbar-item">Add cocktail</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    favorite(){
      return this.$store.getters['panier/favorite']
    }
  },
  methods: {
    activeModal(){
       this.$store.commit('modal/CHANGE_VALUE')
    }
  }
  
}
</script>

<style scoped>
.fav {
  cursor: pointer;
}
</style>

