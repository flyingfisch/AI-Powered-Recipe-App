<template>
  <v-container>
    <h1>App Content</h1>

    <v-select
      label="Select Cuisines"
      v-model="selectedCuisines"
      :items="cuisines"
      multiple
    ></v-select>

    <v-btn @click="handleGenerateRecipesClick">Generate Recipes!</v-btn>

    <div v-if="loading">Loading recipes...</div>
    <div v-if="error">Error getting recipes.</div>
    <div>{{ recipes }}</div>
  </v-container>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRecipesApi } from '../composables/recipesApi';

const selectedCuisines = ref([]);

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

const { recipes, loading, error, fetchRecipes } = useRecipesApi();

const handleGenerateRecipesClick = () => {
  fetchRecipes(selectedCuisines.value);
}
</script>
