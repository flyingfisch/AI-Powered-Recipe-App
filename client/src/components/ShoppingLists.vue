<template>
    <v-row>
        <v-col>
            <v-card
                v-for="shoppingList in shoppingLists"
                variant="elevated"
                color="blue-grey darken-7"
            >
                <v-card-title>{{ shoppingList.recipeName }}</v-card-title>

                <v-list :items="shoppingList.shoppingListItems"></v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRecipesApi } from '../composables/recipesApi'

interface ShoppingList {
    recipeName: string
    shoppingListItems: ShoppingListItem[]
}

interface ShoppingListItem {
    name: string
}

const shoppingLists = ref<ShoppingList[]>([])
shoppingLists.value = recipes.value
    .filter((recipe) => recipe.selected)
    .map((recipe) => ({
        recipeName: recipe.name,
        shoppingListItems: recipe.ingredients.map((ingredient) => ({
            name: ingredient,
        })),
    }))
</script>
