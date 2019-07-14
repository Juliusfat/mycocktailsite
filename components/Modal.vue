<template>
  <div class="popup">
    <img class="cross-svg" src="@/static/close.svg" alt="" @click="closeModal">
    <h1 class="title is-2">list of your precious cocktails</h1>
    <div class="carte">
      <vue-flip
        v-for="fav in listFav"
        :key="fav.idDrink"
        :active-click="true"
        width="200px"
        height="220px"
        transition="1s"
        class="flip"
      >
        <div slot="front" class="pile">
          <img :src="fav.strDrinkThumb" alt />
        </div>
        <div slot="back" class="face">
          <span class="info title is-5">{{fav.strDrink}}</span>
          <button class="remove is-danger" @click="removeFavorite(fav.idDrink)">Remove</button>
        </div>
      </vue-flip>
    </div>
  </div>
</template>

<script>
import VueFlip from 'vue-flip'

export default {
  components: {
    VueFlip
  },
  methods: {
    removeFavorite(id) {
      this.$store.commit('panier/REMOVE_COCKTAIL', id)
    },
    closeModal() {
      this.$store.commit('modal/CHANGE_VALUE')
    }

  },
  computed: {
    listFav() {
      return this.$store.getters['panier/listFav']
    }
  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  background: linear-gradient(to right, rgb(225, 238, 195), rgb(240, 80, 83));
  top: 15%;
  right: 30%;
  z-index: 10;
  height: 42em;
  width: 50em;
  box-shadow: 10px 5px 5px grey;
}

.pile {
  height: 100%;
  color: white !important;
}

img {
  height: 100%;
}

.flip {
  margin: 1em;
  cursor: pointer;
}

.carte {
  display: flex;
  flex-wrap: wrap;
  width: 87%;
  margin: auto;
}

.face {
  font-weight: bold;
  text-align: center;
  background-color: #efa94b;
  height: 100%;
  color: beige;
}

.title {
  text-align: center;
  color: beige;
  margin: 1em 0;
  text-transform: capitalize; 
}

.remove{
  width: 100%;
  height: 2em;
  font-size: 1em;
  background-color: #EF5254;
  border: none;
  font: bold;
  color: white;
  position: absolute;
  bottom: 0.5em;
  left: 0;
}

.info {
  position: absolute;
  top: 0.2em;
  left: 0;
  text-align: center;
  width: 100%;
}

.cross-svg{
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
}
</style>

