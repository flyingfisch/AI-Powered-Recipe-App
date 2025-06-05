<template>
  <v-row>
    <v-col>
      <v-card variant="elevated" color="blue-grey darken-7">
        <v-card-title>{{ shoppingList.recipeName }}</v-card-title>

        <v-list
          select-strategy="leaf"
          @update:selected="$emit('item-selected')"
        >
          <v-list-item
            v-for="(item, index) in shoppingList.shoppingListItems"
            :key="index"
            :value="item.name"
            :title="item.name"
            @click="item.checked = !item.checked"
          >
            <template #prepend>
              <v-list-item-action start>
                <v-checkbox-btn
                  v-model="item.checked"
                  @click.stop
                ></v-checkbox-btn>
              </v-list-item-action>
            </template>
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
