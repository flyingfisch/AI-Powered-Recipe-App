import { ref } from "vue";

export type Recipe = {
    name: string;
    ingredients: string[];
    steps: string[];
    selected: boolean;
}

type RecipesApiResponse = {
    recipes: Recipe[];
}

export function useRecipesApi() {
    const recipesApiUrl = import.meta.env.VITE_RECIPES_API_URL;

    const recipes = ref<Recipe[]>([]);
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

        // Fetch recipes
        fetch(recipesApiUrl + '/recipes?cuisines=' + cuisines.join(','))
            .then(response => response.json())
            .then(data => {
                const recipesFromApi = data.recipes.map((recipe: Recipe) => ({
                    ...recipe,
                    selected: false
                }));
                const selectedRecipes = recipes.value.filter(recipe => recipe.selected == true);

                recipes.value = [...selectedRecipes, ...recipesFromApi];
                saveRecipesToLocalStorage(recipesFromApi as Recipe[]);

                loading.value = false;
            })
            .catch(error => {
                error.value = error;
                loading.value = false;

                console.error("Error fetching recipes:", error);
            });
    }

    const getRecipesFromLocalStorage = async () => {
        const storedRecipes = localStorage.getItem('recipes');

        try {
            if (storedRecipes) {
                recipes.value = JSON.parse(storedRecipes);
            } else {
                recipes.value = [];
            }
        } catch {
            recipes.value = [];
        }
    }

    const saveRecipesToLocalStorage = async (recipes: Recipe[]) => {
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    getRecipesFromLocalStorage();

    return { recipes, loading, error, fetchRecipes, saveRecipesToLocalStorage, getRecipesFromLocalStorage };
}