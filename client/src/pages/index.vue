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

                <v-btn @click="handleGenerateRecipesClick"
                    >Generate Recipes!</v-btn
                >

                <div v-if="loading">Loading recipes...</div>
                <div v-if="error">Error getting recipes.</div>
            </v-col>
        </v-row>

        <recipe-card
            v-if="!loading && !error"
            v-for="recipe in recipes"
            :recipe="recipe"
            @recipeSelected="handleSelectRecipeClick"
        ></recipe-card>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRecipesApi } from '../composables/recipesApi'

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

const handleGenerateRecipesClick = () => {
    fetchRecipes(selectedCuisines.value)
}

const handleSelectRecipeClick = (recipe) => {
    recipe.selected = !recipe.selected
}
</script>
