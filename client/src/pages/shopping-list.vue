<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Shopping List</h1>
      </v-col>
    </v-row>

    <recipe-shopping-list
      v-for="shoppingList in shoppingLists"
      :key="shoppingList.recipeId"
      :shopping-list="shoppingList"
      @item-selected="saveShoppingListToStore(shoppingList)"
    />
  </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import { useShoppingListsStore } from '@/stores/shoppingLists'
import type { ShoppingList, ShoppingListItem } from '@/types/shoppingList'

const recipesStore = useRecipesStore()
const shoppingListsStore = useShoppingListsStore()

const shoppingLists = ref<ShoppingList[]>([])

// First get shopping lists from the store, filtering out lists that don't have a recipe (the user deselected these)
// Then merge with shopping lists from newly selected recipes.
// Since each recipe is immutable, we don't need to worry about updating existing shopping lists.
const storedShoppingLists = shoppingListsStore.shoppingLists.filter((list) =>
  recipesStore.recipes.some(
    (recipe) => recipe.id === list.recipeId && recipe.selected
  )
)

const shoppingListsFromNewRecipes = recipesStore.recipes
  .filter(
    (recipe) =>
      recipe.selected &&
      !storedShoppingLists.some((list) => list.recipeId === recipe.id)
  )
  .map<ShoppingList>((recipe) => ({
    recipeId: recipe.id,
    recipeName: recipe.name,
    shoppingListItems: recipe.ingredients.map((ingredient) => ({
      name: ingredient,
      checked: false,
    })),
  }))

shoppingLists.value = [...storedShoppingLists, ...shoppingListsFromNewRecipes]
shoppingListsStore.setShoppingLists(shoppingLists.value)

const saveShoppingListToStore = (shoppingList: ShoppingList) => {
  shoppingListsStore.updateShoppingList(shoppingList)
}
</script>
