export type ShoppingList = {
    recipeId: string
    recipeName: string
    shoppingListItems: ShoppingListItem[]
}

export type ShoppingListItem = {
    name: string
    checked: boolean
}
