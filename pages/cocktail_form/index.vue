<template>
  <div v-if="categories" class="container is-fluid">
    <h1 class="title is-2 center has-text-centered">Propose your cocktail</h1>
    <div v-if="errors.length" class="my-errors">
      <b>Solve the following error(s):</b>
      <ul>
        <li v-for="(error,index) in errors" :key="index">{{error}}</li>
      </ul>
    </div>
    <form>
      <div>
        <label class="label title is-4" for="name">
          Name
          <font-awesome-icon
            @mouseenter="viewField"
            @mouseleave="viewField"
            :icon="['fas', 'info-circle']"
          />
          <span v-show="required" class="title is-6">field required !</span>
        </label>
        <input
          v-bind:class="{'border-red': nameless }"
          v-model="name"
          class="input is-info is-medium"
          type="text"
        />
      </div>
      <div>
        <label class="label title is-4" for="type">Type</label>
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
                >
                  <font-awesome-icon :icon="['fas','times']" />&nbsp;
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="add button is-info" @click.prevent="addIngredient">
          <font-awesome-icon :icon="['fas','plus']" />&nbsp;
          add ingredient
        </button>
      </div>
      <div>
        <label class="label title is-4" for="description">
          Description
          <font-awesome-icon
            @mouseenter="viewField"
            @mouseleave="viewField"
            :icon="['fas', 'info-circle']"
          />
          <span v-show="required" class="title is-6">field required !</span>
        </label>
        <textarea
          v-bind:class="{'border-red': descriptionless }"
          v-model="description"
          name="description"
          class="textarea is-info is-medium"
          placeholder="Write your description"
          rows="10"
        ></textarea>
      </div>
      <button type="submit" class="button valid is-primary is-medium" @click.prevent="submitForm">
        <span clas="icon">
          <font-awesome-icon :icon="['fas','check']" />
        </span>
        &nbsp;
        <span>
          <b>Submit</b>
        </span>
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
let miniToastr
if (process.client) {
  miniToastr = require('mini-toastr').default
}

export default {
  async asyncData() {
    let data = await axios.get('http://localhost:3000/categories')
    return { categories: data.data }
  },
  mounted() {
    miniToastr.init()
  },
  data() {
    return {
      type: 'choose',
      required: false,
      categories: [],
      name: null,
      description: null,
      myCategory: 'choose',
      compositions: [{ ingredient: '', measure: '' }],
      lastIngredient: true,
      errors: [],
      nameless: false,
      descriptionless: false
    }
  },
  notifications: {
    addSuccess: {
      title: 'Success!!',
      message: 'cocktail will save',
      type: 'success'
    },
    addError: {
      title: 'Error!!!',
      message: 'cocktail not saved',
      type: 'error'
    }
  },
  methods: {
    addIngredient() {
      this.compositions.push({ ingredient: '', measure: '' })
    },
    deleteIngredient(index) {
      this.compositions.splice(index, 1)
    },
    viewField() {
      this.required = !this.required
    },
    submitForm() {
      this.errors = []
      this.nameless = false
      this.descriptionless = false
      if (!this.name) {
        this.errors.push('the name is required!')
        this.nameless = true
      }
      if (!this.description) {
        this.errors.push('the description is required!')
        this.descriptionless = true
      }
      if (this.errors.length === 0) {
        const category = this.categories.find(
          i => i.description === this.myCategory
        )
        const cocktail = {
          name: this.name,
          categoryId: category.id,
          type: this.type,
          description: this.description,
          composition: this.compositions,
          validate: false
        }
        this.saveCocktail(cocktail)
      } else {
        window.scrollTo(0,0);
      }
    },
    saveCocktail(cocktail) {
      axios
        .post('http://localhost:3000/cocktails', cocktail)
        .then(response => {
          this.addSuccess()
          this.type = 'choose'
          this.name = null
          this.description = null
          this.myCategory = 'choose'
          this.compositions = [{ ingredient: '', measure: '' }]
          this.lastIngredient = true
          this.errors = []
          ;(this.nameless = false), (this.descriptionless = false)
        })
        .catch(function(error) {
          this.addError()
          console.log(error)
        })
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
.my-errors {
  color: brown;
}
.valid {
  margin-top: 3em;
}
.border-red {
  border-color: brown;
}
</style>
