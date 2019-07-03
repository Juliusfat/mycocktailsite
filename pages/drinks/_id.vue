<template>
  <div v-if="drink" class="container is-fluid">
    <div class="columns">
      <div class="column is-three-thirds">
        <img :src="drink.strDrinkThumb" class="picture" />
      </div>
      <div class="column right">
        <h1 class="title is-2">{{drink.strDrink}}</h1>
        <h3 class="title is-4">Instructions</h3>
        <p class="is-medium">{{drink.strInstructions}}</p>
        <h3 class="title is-4">Composition</h3>
        <table>
          <thead>
            <tr>
              <th>Ingredients</th>
              <th>Measure</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(compo, index) in tabIngMes" :key="index">
              <td>{{compo.ingredient}}</td>
              <td>{{compo.quantity}}</td>
            </tr>
          </tbody>
        </table>
        <nuxt-link to="/">
          <button class="go-home button is-dark">Go home!</button>
        </nuxt-link>
        <button v-if="inFavorite" class="add-store button is-danger" @click="removeFavorite(drink.idDrink)">Del Favorite</button>
        <button v-else class="add-store button is-link" @click="addFavorite(drink.idDrink)">add Favorite</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

function createTab(obj) {
  const keepProps = []
  for (let i = 1; i < 16; i++) {
    keepProps.push({
      ingredient: obj[`strIngredient${i}`],
      quantity: obj[`strMeasure${i}`]
    })
  }
  return keepProps
}
export default {
  data() {
    return {
      index: 15,
      drink: {},
      tabIngMes: []
    }
  },
  async asyncData({ params }) {
    let { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
    )
    return { drink: data.drinks[0], tabIngMes: createTab(data.drinks[0]) }
  },
  methods: {
    addFavorite(id){
      this.$store.commit('panier/ADD_COCKTAIL',id)
    },
    removeFavorite(id){
      this.$store.commit('panier/REMOVE_COCKTAIL',id)
    }
  },
  computed: {
    inFavorite(){
      return this.$store.getters['panier/isInFav'](this.drink.idDrink)
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 4em;
}

.picture {
  height: 34em;
}

table {
  width: 60%;
}

p {
  margin-bottom: 2em;
}

.right{
  position: relative;
}

.go-home {
  position: absolute;
  right: 1em;
  bottom: 4em;
}

.add-store{
  position: absolute;
  right: 1em;
  bottom: 1em;
}

button {
  width: 7em
}
</style>