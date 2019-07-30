<template>
  <div v-if="categories" class="container is-fluid">
    <h1 class="title is-2 center has-text-centered">Propose your cocktail</h1>
    <form>
      <div>
        <label class="label title is-4" for="name">Name 
          <font-awesome-icon :icon="['fas', 'info-circle']"/>
        </label>
        <input class="input is-info is-medium" type="text" />
      </div>
      <div>
        <label class="label title is-4" for="type">Type
          <font-awesome-icon :icon="['fas', 'info-circle']"/>
        </label>
        <div class="select is-info is-medium">
          <select class="choice" v-model="type">
            <option disabled value="choose">-- choose --</option>
            <option>alcoholic</option>
            <option>Non alcoholic</option>
          </select>
        </div>
      </div>
      <div>
        <label class="label title is-4" for="category">Category</label>
        <div class="select is-info is-medium">
          <select class="choice" v-model="myCategory">
            <option disabled value="choose">--choose--</option>
            <option v-for="category in categories" :key="category.id">{{category.description}}</option>
          </select>
        </div>
      </div>
      <div>
        <label class="label title is-4" for="description">Description</label>
        <textarea
          name="description"
          class="textarea is-info is-medium"
          placeholder="Write your description"
          rows="10"
        ></textarea>
      </div>
      <div>
        <label class="label title is-4" for="compositions">Composition</label>
        <table>
          <thead>
            <tr>
              <th class="title is-5 head has-text-centered" width="45%">Ingredient</th>
              <th class="title is-5 head has-text-centered" width="45%">Measure</th>
              <th width="10%"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(composition, index) in compositions" :key="index">
              <td>
                <input class="input is-info is-medium" v-model="composition.ingredient" type="text" />
              </td>
              <td>
                <input class="input is-info is-medium" v-model="composition.measure" type="text" />
              </td>
              <td>
                <button
                  :disabled="lastIngredient"
                  class="button is-danger"
                  @click.prevent="deleteIngredient(index)"
                >delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="add button is-info" @click.prevent="addIngredient">Add ingredient</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData() {
    let data = await axios.get('http://localhost:3000/categories')
    return { categories: data.data }
  },
  data() {
    return {
      type: 'choose',
      categories: [],
      myCategory: 'choose',
      compositions: [{ ingredient: '', measure: '' }],
      lastIngredient: true
    }
  },
  methods: {
    addIngredient() {
      this.compositions.push({ ingredient: '', measure: '' })
    },
    deleteIngredient(index) {
      this.compositions.splice(index, 1)
    }
  },
  watch: {
    compositions() {
      if (this.compositions && this.compositions.length > 1) {
        this.lastIngredient = false
      } else {
        this.lastIngredient = true
      }
    }
  }
}
</script>

<style scoped>
.label {
  display: block;
  margin-top: 1em;
}

.container {
  width: 35em;
  margin: 4em auto;
}
.select {
  width: 50%;
}
.choice {
  width: 100%;
}
.title {
  margin-bottom: 1em;
}

.head {
  padding-bottom: 0.5em;
}

.is-danger {
  height: 2.8em;
}

.add {
  margin-top: 0.5em;
}

table {
  border-collapse: separate;
  border-spacing: 0.2em;
}
</style>
