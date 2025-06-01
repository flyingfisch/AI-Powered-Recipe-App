<template>
  <v-container>
    <v-row>
      <v-col>
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
      </v-col>
    </v-row>

    <v-row v-for="recipe in recipes">
      <v-col>
        <v-card>
          <v-card-title>{{ recipe.name }}</v-card-title>

          <v-card-subtitle>
            Ingredients
          </v-card-subtitle>

          <v-card-text>
            <ul>
              <li v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
            </ul>
          </v-card-text>

          <v-card-subtitle>
            Steps
          </v-card-subtitle>

          <v-card-text>
            <ol>
              <li v-for="step in recipe.steps">{{ step }}</li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
