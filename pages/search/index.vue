<template>
  <div class="container is_fluid">
    <h1 class="title is-2">Search page</h1>
    <div class="columns">
      <div class="field column is-one-third">
        <div class="control">
          <input
            class="input is-info"
            v-model="search"
            type="text"
            placeholder="Search cocktail..."
          />
        </div>
      </div>
      <div v-if="loading" class="column cocktail-vue">
        <div v-for="(cocktail, index) in cocktails" :key="index">
          <nuxt-link :to="'/drinks/' + cocktail.idDrink">
            <div
              class="cocktail-card"
              :style="`background:url(${cocktail.strDrinkThumb}); background-size:cover`"
            >
              <h3 class="cocktail-name title is-5">{{cocktail.strDrink}}</h3>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
export default {
  data() {
    return {
      search: '',
      loading: false,
      cocktails: []
    }
  },
  created() {
    this.debouncedGetAnswer = _.debounce(() => {
      this.search
    }, 500)
  },
  watch: {
    search(value) {
      this.debouncedGetAnswer()
      if (value !==''){
      axios
        .get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`
        )
        .then(data => {
          this.cocktails = data.data.drinks
          this.loading = true
        })
      }
    }
  }
}
</script>


<style scoped>
h1 {
  margin-top: 2em;
}

.cocktail-card {
  height: 17em;
  width: 15em;
  border: 0.5em solid #eff0f1;
  margin: 0.2em;
}
.cocktail-name {
  color: #f87024;
  text-align: center;
  margin-top: 10em;
}
.cocktail-vue{
    display: flex;
    flex-wrap: wrap;
}
</style>

