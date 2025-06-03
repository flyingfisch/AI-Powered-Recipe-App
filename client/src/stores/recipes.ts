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
    },
    persist: true,
})
