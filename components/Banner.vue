<template>
  <div
    class="banner"
    :style="{'background-image': `url(${require('@/static/images/bg-martini.jpg')})`}"
  >
    >
    <div ref="panel" class="reveal banner-text">
      <h1 class="title is-2">Welcome to the cocktail World</h1>
      <p class="catchphrase">find your favorite cocktails...</p>
      <p class="catchphrase">share your creations</p>
    </div>
  </div>
</template>

<script>
const options = {
  root: null,
  threshold : 0.1
}
export default {
    data() {
        return {
            observer: null
        }
    },
    mounted(){
        this.observer = new IntersectionObserver( entries => {
            entries.forEach( entry => {
                this.handleInstersect(entry)
            }
        )}, this.options)
        
        this.observer.observe(this.$refs.panel)
    },
    destroyed(){
        this.observer.unobserve(this.$ref.panel)
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
.banner {
  height: 58em;
  width: 100%;
  background: no-repeat center;
}
.banner-text {
  text-align: center;
  color: bisque;
  margin-top: 17em;
}

.title {
  text-transform: uppercase;
  color: bisque;
}

.catchphrase {
  font-size: 2em;
}
</style>


