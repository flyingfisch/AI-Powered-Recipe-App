import { defineStore } from 'pinia'
import type { ShoppingList } from '@/types/shoppingList'

export const useShoppingListsStore = defineStore('shoppingLists', {
    state: () => ({
        shoppingLists: [] as ShoppingList[],
    }),
    actions: {
        setShoppingLists(shoppingLists: ShoppingList[]) {
            this.shoppingLists = shoppingLists
        },
        updateShoppingList(updatedShoppingList: ShoppingList) {
            const index = this.shoppingLists.findIndex(
                (shoppingList) =>
                    shoppingList.recipeId === updatedShoppingList.recipeId
            )

            if (index !== -1) {
                this.shoppingLists[index] = updatedShoppingList
            }
        },
    },
    persist: true,
})
