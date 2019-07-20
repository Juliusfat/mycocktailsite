<template>
  <div>
    <banner></banner>
    <div class="reveal">
    <spotlight></spotlight>
    </div>
    <div v-show="wines && drinks" class="container is-fluid">
      <h1 class="title is-3">Few Margarita's Cocktails</h1>
      <div class="reveal container">
        <div class="columns is-multiline">
          <nuxt-link
            class="column is-one-fifth"
            v-for="drink in drinks"
            :key="drink.idDrink"
            :to="'/drinks/' + drink.idDrink"
          >
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="drink.strDrinkThumb" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img :src="drink.strDrinkThumb" alt="Placeholder image" />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-5">{{drink.strDrink}}</p>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <h1 class="title is-3" style="margin-top: 2em;">Few Wine's Cocktails</h1>
      <div class="reveal container">
        <div class="columns is-multiline">
          <nuxt-link
            class="column is-one-fifth"
            v-for="wine in wines"
            :key="wine.idDrink"
            :to="'/drinks/' + wine.idDrink"
          >
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="wine.strDrinkThumb" alt="Placeholder image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img :src="wine.strDrinkThumb" alt="Placeholder image" />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-5">{{wine.strDrink}}</p>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from '@/components/Banner'
import Spotlight from'@/components/Spotlight'
const options = {
  root: null,
  threshold: 0.1
}
export default {
  components: {
    Banner,
    Spotlight
  },
  data() {
    return {
      drinks: [],
      wines: [],
      observer: null
    }
  },
  async asyncData() {
    let [data, myWine] = await Promise.all([
      axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`
      ),
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=wine`)
    ])
    return {
      drinks: data.data.drinks,
      wines: myWine.data.drinks
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      this.handleInstersect(entries[0])
    }, this.options)
    const targets = document.querySelectorAll('.reveal')
    targets.forEach(target => {
      this.observer.observe(target)
    })
  },
  destroyed() {
    this.observer.disconnect()
  },
  methods: {
    handleInstersect(entry) {
      entry.target.classList.remove('reveal')
      entry.target.classList.add('reveal-visible')
    }
  }
}
</script>

<style scoped>
.columns {
  flex-wrap: wrap;
  align-items: stretch;
}
.container {
  width: 90em;
  margin: 4em auto;
}

.card:hover{
  opacity: 0.5;
} 
</style>


