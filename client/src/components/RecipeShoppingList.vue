<template>
    <v-row>
        <v-col>
            <v-card variant="elevated" color="blue-grey darken-7">
                <v-card-title>{{ shoppingList.recipeName }}</v-card-title>

                <v-list>
                    <v-list-item
                        v-for="(item, index) in shoppingList.shoppingListItems"
                        :key="index"
                        :value="index"
                        @click="$emit('itemChecked', item)"
                    >
                        <template #prepend>
                            <v-icon
                                v-if="item.checked"
                                icon="mdi-check"
                                color="green"
                            ></v-icon>
                            <v-icon
                                v-else
                                icon="mdi-checkbox-blank-outline"
                                color="grey"
                            ></v-icon>
                        </template>
                        <v-list-item-title>
                            {{ item.name }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { ShoppingList, ShoppingListItem } from '@/types/shoppingList'

const props = defineProps<{
    shoppingList: ShoppingList
}>()
</script>
