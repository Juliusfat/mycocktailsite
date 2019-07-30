<template>
  <div class="popup">
    <img class="cross-svg" src="@/static/close.svg" alt @click="closeModal" />
    <h1 class="title is-2">list of your precious cocktails</h1>
    <div class="carte">
      <div class="flip-card flip" v-for="fav in listFav" :key="fav.idDrink">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img :src="fav.strDrinkThumb" alt />
          </div>
          <div class="flip-card-back">
            <span class="info title is-5">{{fav.strDrink}}</span>
            <button class="remove is-danger" @click="removeFavorite(fav.idDrink)">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
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
  width: 49em;
  box-shadow: 10px 5px 5px grey;
}

.flip-card {
  background-color: transparent;
  width: 12em;
  height: 14em;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.flip-card-front {
  height: 100%;
  color: white !important;
}

img {
  height: 100%;
}

.flip {
  margin: 1em;
}

.carte {
  display: flex;
  flex-wrap: wrap;
  width: 87%;
  margin: auto;
}

.flip-card-back {
  font-weight: bold;
  text-align: center;
  background-color: #efa94b;
  height: 100%;
  color: beige;
  transform: rotateY(180deg);
}

.title {
  text-align: center;
  color: beige;
  margin: 1em 0;
  text-transform: capitalize;
}

.remove {
  width: 100%;
  height: 2em;
  font-size: 1em;
  background-color: #ef5254;
  border: none;
  font: bold;
  color: white;
  position: absolute;
  bottom: 0.5em;
  left: 0;
  cursor: pointer;
}

.info {
  position: absolute;
  top: 0.2em;
  left: 0;
  text-align: center;
  width: 100%;
}

.cross-svg {
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
}
</style>

