<template>
  <div v-if="drink" class="container is-fluid">
    <div class="columns" ref="content">
      <div class="image column is-three-thirds">
        <img :src="drink.strDrinkThumb" class="picture" />
      </div>
      <div class="column right">
        <div>
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
        </div>
      </div>
    </div>
    <div class="rating-button">
      <div>
        <star-rating :border-width="3" :rating="3" :star-size="35"></star-rating>
      </div>
      <div class="go-home" data-html2canvas-ignore="true">
        <button class="button is-success" @click="download()">PDF</button>
        <nuxt-link to="/">
          <button class="button is-dark">Go home!</button>
        </nuxt-link>
        <button
          v-if="inFavorite"
          class="button is-danger"
          @click="removeFavorite(drink.idDrink)"
        >Del Favorite</button>
        <button v-else class="button is-primary" @click="addFavorite(drink)">add Favorite</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let miniToastr
if (process.client) {
  miniToastr = require('mini-toastr').default
}
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
      tabIngMes: [],
      rating: 3
    }
  },
  async asyncData({ params }) {
    let { data } = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
    )
    return { drink: data.drinks[0], tabIngMes: createTab(data.drinks[0]) }
  },
  mounted() {
    miniToastr.init()
  },
  notifications: {
    showFav: {
      title: 'Success!!',
      message: 'add to favorites',
      type: 'success'
    },
    delFav: {
      title: 'Remove!!!',
      message: 'remove from favorites',
      type: 'warn'
    }
  },
  methods: {
    addFavorite(id) {
      this.$store.commit('panier/ADD_COCKTAIL', id)
      this.showFav()
    },
    removeFavorite(id) {
      this.$store.commit('panier/REMOVE_COCKTAIL', id)
      this.delFav()
    },
    download() {
      if (process.client) {
        let jsPDF = require('jspdf')
        let html2canvas = require('html2canvas')
        const doc = new jsPDF('landscape', 'mm', 'a4')
        var canvasElement = document.createElement('canvas')
        html2canvas(this.$refs.content, {
          canvas: canvasElement,
          imageTimeout: 5000,
          useCORS: true
        }).then(canvas => {
          const img = canvas.toDataURL('image/jpeg', 1.0)
          doc.setFontSize(12)
          doc.addImage(img, 'JPEG', 6, 20)
          doc.setProperties({
            title: this.drink.strDrink
          })
          doc.save(this.drink.strDrink + '.pdf')
        })
      }
    }
  },
  computed: {
    inFavorite() {
      return this.$store.getters['panier/isInFav'](this.drink.idDrink)
    }
  }
}
</script>

<style scoped>
.container {
  width: 70em;
  margin: 10em auto;
  color: grey;
}

.picture {
  height: 34em;
}

table {
  width: 60%;
}
.is-medium {
  width: 30em;
}

p {
  margin-bottom: 2em;
}

.right {
  position: relative;
  margin-left: 1em;
}
.rating-button {
  display: flex;
}

.go-home {
  margin-left: auto;
}

.image {
  border: solid 1em white;
  padding: 0;
}

button {
  width: 7em;
  height: 3em;
}

.mini-toastr__notification {
  right: inherit !important;
  top: inherit !important;
  left: 5em !important;
  bottom: 2em !important;
}
</style>