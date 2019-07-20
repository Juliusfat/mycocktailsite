<template>
  <div v-if="spotlight" class="spotlight">
    <div class="container is-fluid">
      <h1 class="spotitle title is-2 has-text-centered">In the spotlight</h1>
      <div class="columns">
        <div class="column parent reverse">
           <transition name="slide-fade">
          <h2 v-show ="inHover" class="enfant spotitle title is-3">{{spotlight.strDrink}}</h2>
           </transition>
        </div>
        <nuxt-link :to="'/drinks/' + spotlight.idDrink">
        <div class="column image" @mouseenter="imIn" @mouseleave="imIn">
          <img :src="spotlight.strDrinkThumb" alt />
        </div>
        </nuxt-link>
        <div class="column parent">
          <transition name="slide-fade">
          <h3 v-show="inHover" class="enfant spotitle title is-4"> A cocktail based on {{ spotlight.strIngredient1}}</h3>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      spotlight: null,
      inHover: false
    }
  },
  created() {
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(data => {
        this.spotlight = data.data.drinks[0]
      })
  },
  methods: {
    imIn() {
      this.inHover = !this.inHover
    }
  }
}
</script>

<style scoped>
.spotlight {
  position: relative;
  height: 50em;
  width: 100%;
  background: linear-gradient(to right, rgb(97, 207, 235), rgb(112, 139, 146));
  border-top: thick double white;
  border-bottom: thick double white;
  padding: 6em 0;
}

.spotitle {
  text-transform: uppercase;
  margin-bottom: 1em;
  color: bisque;
}

img {
  height: 30em;
  width: 25em;
  border: solid 1em white;
}

.parent {
  display: flex;
}

.enfant {
  margin: auto 0;
}
.reverse {
  flex-direction: row-reverse;
}

.image {
  cursor: pointer;
}


.image:hover {
  opacity: 1;
  -webkit-animation: flash 1.5s;
  animation: flash 1.5s;
}
@-webkit-keyframes flash {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
@keyframes flash {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(10px);
  opacity: 0;
}
</style>

