import { ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import type { Recipe } from '@/types/recipe'

type RecipesApiResponse = {
    recipes: Recipe[]
}

export function useRecipesApi() {
    const recipesApiUrl = import.meta.env.VITE_RECIPES_API_URL
    const recipesStore = useRecipesStore()

    const recipes = ref<Recipe[]>(recipesStore.recipes)
    const loading = ref<boolean>(false)
    const error = ref(null)

    const fetchRecipes = async (cuisines: string[]) => {
        // Validation
        if (cuisines.length === 0) {
            alert('Please select at least one cuisine.')
            return
        }

        // Reset state before fetching new recipes
        error.value = null
        loading.value = true

        // Fetch recipes
        fetch(recipesApiUrl + '/recipes?cuisines=' + cuisines.join(','))
            .then((response) => response.json())
            .then((data: RecipesApiResponse) => {
                const recipesFromApi = data.recipes.map((recipe: Recipe) => ({
                    ...recipe,
                    selected: false,
                }))
                const selectedRecipes = recipes.value.filter(
                    (recipe: Recipe) => recipe.selected == true
                )

                recipes.value = [...selectedRecipes, ...recipesFromApi]
                recipesStore.setRecipes(recipes.value)

                loading.value = false
            })
            .catch((error) => {
                error.value = error
                loading.value = false

                console.error('Error fetching recipes:', error)
            })
    }

    return { recipes, loading, error, fetchRecipes }
}
