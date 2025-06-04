<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Shopping List</h1>
            </v-col>
        </v-row>

        <recipe-shopping-list
            v-for="shoppingList in shoppingLists"
            :shopping-list="shoppingList"
            @item-checked="(item) => shoppingListItemChecked(item)"
        />
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes'
import type { ShoppingList, ShoppingListItem } from '@/types/shoppingList'

const recipesStore = useRecipesStore()

const shoppingLists = ref<ShoppingList[]>([])
shoppingLists.value = recipesStore.recipes
    .filter((recipe) => recipe.selected)
    .map<ShoppingList>((recipe) => ({
        recipeName: recipe.name,
        shoppingListItems: recipe.ingredients.map((ingredient) => ({
            name: ingredient,
            checked: false,
        })),
    }))

const shoppingListItemChecked = (item: ShoppingListItem) => {
    item.checked = !item.checked
}
</script>
