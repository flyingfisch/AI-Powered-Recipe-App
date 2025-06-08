<template>
  <v-container>
    <v-row class="pb-0">
      <v-col>
        <h1>Recipes</h1>

        <v-select
          label="Select Cuisines"
          v-model="selectedCuisines"
          :items="cuisines"
          multiple
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col class="text-center">
        <v-btn
          @click="handleGenerateRecipesClick"
          size="large"
          rounded="xl"
          color="primary"
        >
          Generate Recipes!
        </v-btn>

        <div v-if="loading">Loading recipes...</div>
        <div v-if="error">Error getting recipes.</div>
      </v-col>
    </v-row>

    <recipe-card
      v-if="!loading && !error"
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
      @recipe-selected="handleSelectRecipe"
    ></recipe-card>
  </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  requiresRole: User
</route>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRecipesApi } from '@/composables/recipesApi'
import { useRecipesStore } from '@/stores/recipes'
import type { Recipe } from '@/types/recipe'
import { useAuth0 } from '@auth0/auth0-vue'

const selectedCuisines = ref<string[]>([])

const cuisines = ref<string[]>([
  'Italian',
  'Chinese',
  'Mexican',
  'Indian',
  'French',
  'Japanese',
  'Mediterranean',
  'American',
])

const { user } = useAuth0()
console.log('User:', user)

const { recipes, loading, error, fetchRecipes } = useRecipesApi()
const recipesStore = useRecipesStore()

const handleGenerateRecipesClick = () => {
  fetchRecipes(selectedCuisines.value)
}

const handleSelectRecipe = (recipe: Recipe) => {
  recipe.selected = !recipe.selected

  recipesStore.updateRecipe(recipe)
}
</script>
