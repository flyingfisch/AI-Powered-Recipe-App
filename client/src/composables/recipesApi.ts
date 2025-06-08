import { ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useAuth0 } from '@auth0/auth0-vue'
import type { Recipe } from '@/types/recipe'

export function useRecipesApi() {
  const recipesApiUrl = import.meta.env.VITE_RECIPES_API_URL
  const recipesStore = useRecipesStore()
  const { getAccessTokenSilently } = useAuth0()

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
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      },
    })

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }

    fetch(recipesApiUrl + '/recipes?cuisines=' + cuisines.join(','), options)
      .then((response) => response.json())
      .then((data: Recipe[]) => {
        const recipesFromApi = data.map((recipe: Recipe) => ({
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
