<template>
  <div
    class="banner"
    :style="{'background-image': `url(${require('@/static/images/bg-martini.jpg')})`}"
  >
    >
    <div class="reveal banner-text">
      <h1 class="title is-2">Welcome to the cocktail World</h1>
      <p class="catchphrase">find your favorite cocktails...</p>
      <p class="catchphrase">share your creations</p>
    </div>
  </div>
</template>

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


