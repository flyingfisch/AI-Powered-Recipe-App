import { defineStore } from 'pinia'
import type { Recipe } from '@/types/recipe'

export const useRecipesStore = defineStore('recipes', {
    state: () => ({
        recipes: [] as Recipe[],
    }),
    actions: {
        setRecipes(newRecipes: Recipe[]) {
            this.recipes = newRecipes
        },
        updateRecipe(updatedRecipe: Recipe) {
            const index = this.recipes.findIndex(
                (recipe) => recipe.id === updatedRecipe.id
            )

            if (index !== -1) {
                this.recipes[index] = updatedRecipe
            }
        },
    },
    persist: true,
})
