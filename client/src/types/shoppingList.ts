export type ShoppingList = {
    recipeName: string
    shoppingListItems: ShoppingListItem[]
}

export type ShoppingListItem = {
    name: string
    checked: boolean
}
