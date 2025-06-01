import { ref } from "vue";

type Recipe = {
    name: string;
    ingredients: string[];
    steps: string[];
}

type RecipesApiResponse = {
    recipes: Recipe[];
}

export function useRecipesApi() {
    const recipesApiUrl = import.meta.env.VITE_RECIPES_API_URL;

    const recipes = ref<Recipe[] | null>(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchRecipes = async (cuisines: string[]) => {
        // Validation
        if (cuisines.length === 0) {
            alert('Please select at least one cuisine.');
            return;
        }

        // Reset state before fetching new recipes
        error.value = null;
        loading.value = true;
        recipes.value = null;

        // Fetch recipes
        fetch(recipesApiUrl + '/recipes?cuisines=' + cuisines.join(','))
            .then(response => response.json())
            .then(data => {
                recipes.value = data.recipes;
                loading.value = false;
                console.log("Recipes fetched successfully:", data);
            })
            .catch(error => {
                error.value = error;
                loading.value = false;
                console.error("Error fetching recipes:", error);
            });
    }

    return { recipes, loading, error, fetchRecipes };
}