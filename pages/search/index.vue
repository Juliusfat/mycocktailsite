<template>
  <div class="nav-results">
    <div v-show="select" class="container is_fluid">
      <h1 class="title is-2">Select the basic element of the cocktail...</h1>
      <div class="columns">
        <div class="control column is-one-third">
          <div class="select is-primary">
            <select v-model="search">
              <option selected>Select Element..</option>
              <option v-for="(alcohol, i) in sortList" :key="i">{{alcohol.strIngredient1}}</option>
            </select>
          </div>
        </div>
        <div v-if="loading" class="column cocktail-vue">
          <div v-for="(cocktail, index) in displayedCocktails" :key="index">
            <nuxt-link :to="'/drinks/' + cocktail.idDrink">
              <div
                class="cocktail-card"
                :style="`background:url(${cocktail.strDrinkThumb}); background-size: cover;`"
              >
                <h3 class="cocktail-name title is-5">{{cocktail.strDrink}}</h3>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <nav
      v-if="cocktails.length > 9"
      class="pagination is-right pn"
      role="navigation"
      aria-label="pagination"
    >
      <a class="pagination-previous green" v-if="page != 1" @click="page--">Previous</a>
      <a class="pagination-next green" @click="page++" v-if="page < pages.length">Next page</a>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      search: 'Select Element..',
      select: false,
      loading: false,
      cocktails: [],
      listAlcohol: [],
      perPage: 9,
      page: 1,
      pages: []
    }
  },
  created() {
    this.debouncedGetAnswer = _.debounce(() => {
      this.search
    }, 500)
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then(data => {
        this.listAlcohol = data.data.drinks
        this.select = true
      })
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.cocktails.length / this.perPage)
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index)
      }
    },
    paginate(cocktails) {
      let page = this.page
      let perPage = this.perPage
      let from = page * perPage - perPage
      let to = page * perPage
      return cocktails.slice(from, to)
    }
  },
  computed: {
    sortList() {
      this.listAlcohol.sort((a, b) => {
        if (a.strIngredient1 < b.strIngredient1) {
          return -1
        }
        if (a.strIngredient1 > b.strIngredient1) {
          return 1
        }
        return 0
      })
      return this.listAlcohol
    },
    displayedCocktails() {
      return this.paginate(this.cocktails)
    }
  },
  watch: {
    search(value) {
      if (value !== '') {
        axios
          .get(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`
          )
          .then(data => {
            this.cocktails = data.data.drinks
            this.page = 1
            this.pages = []
            this.loading = true
          })
      }
    },
    cocktails() {
      this.setPages()
    }
  }
}
</script>


<style scoped>
h1 {
  margin-top: 2em;
  padding-bottom: 1em;
}

.cocktail-card {
  height: 17em;
  width: 15em;
  border: 0.5em solid white;
  margin: 0.2em;
}
.cocktail-name {
  color: #f87024;
  text-align: center;
  margin-top: 10em;
}
.cocktail-vue {
  display: flex;
  flex-wrap: wrap;
}
.nav-results {
  position: relative;
  height: 62em;
}
.pn {
  position: absolute;
  right: 27em;
  bottom: 0.1em;
}

.green {
  background-color: #00c4a7;
  color: white;
}
</style>

