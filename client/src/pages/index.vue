<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Recipes</h1>

                <v-select
                    label="Select Cuisines"
                    v-model="selectedCuisines"
                    :items="cuisines"
                    multiple
                ></v-select>

                <v-btn @click="handleGenerateRecipesClick">
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

<script lang="ts" setup>
import { ref } from 'vue'
import { useRecipesApi } from '@/composables/recipesApi'
import { useRecipesStore } from '@/stores/recipes'
import type { Recipe } from '@/types/recipe'

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
