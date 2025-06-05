<template>
    <v-row>
        <v-col>
            <v-card
                variant="elevated"
                :color="
                    recipe.selected ? 'blue darken-4' : 'blue-grey darken-7'
                "
                @click="$emit('recipeSelected', recipe)"
            >
                <v-card-title>{{ recipe.name }}</v-card-title>

                <v-card-subtitle>Ingredients</v-card-subtitle>

                <v-card-text>
                    <ul>
                        <li v-for="ingredient in recipe.ingredients">
                            {{ ingredient }}
                        </li>
                    </ul>
                </v-card-text>

                <v-card-subtitle>Steps</v-card-subtitle>

                <v-card-text>
                    <ol>
                        <li v-for="step in recipe.steps">{{ step }}</li>
                    </ol>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Recipe } from '@/types/recipe'

const props = defineProps<{
    recipe: Recipe
}>()

const emit = defineEmits<{
    (event: 'recipeSelected', recipe: Recipe): void
}>()
</script>
