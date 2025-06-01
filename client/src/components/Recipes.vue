<template>
  <v-container>
    <h1>App Content</h1>

    <v-select
      label="Select Cuisines"
      v-model="selectedCuisines"
      :items="cuisines"
      multiple
    ></v-select>

    <v-btn @click="fetchRecipes">Generate Recipes!</v-btn>

    <div>{{ recipeData }}</div>
  </v-container>

</template>

<script setup lang="ts">
import { useGeminiToFetchRecipes } from '../composables/gemini';

const selectedCuisines = ref<string[]>([]);

const cuisines = ref<string[]>([
  'Italian',
  'Chinese',
  'Mexican',
  'Indian',
  'French',
  'Japanese',
  'Mediterranean',
  'American'
]);

const recipeData = ref();

function fetchRecipes() {
  if (selectedCuisines.value.length === 0) {
    alert('Please select at least one cuisine.');
    return;
  }

  recipeData.value = 'Loading recipes...';

  useGeminiToFetchRecipes('Generate 5 recipes based on the following cuisines: ' + selectedCuisines.value.join(', '))
    .then(recipes => {
      console.log('Generated Recipes:', JSON.parse(recipes.text));
      recipeData.value = recipes;
      // Handle the recipes, e.g., display them in the UI
    })
    .catch(error => {
      console.error('Error generating recipes:', error);
    });
}
</script>
