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

                <v-row no-gutters align="stretch" class="d-flex">
                    <v-col cols="12" sm="6" class="bg-background">
                        <v-list dense class="bg-background">
                            <v-list-subheader>Ingredients</v-list-subheader>
                            <v-list-item
                                v-for="(
                                    ingredient, index
                                ) in recipe.ingredients"
                                :key="index"
                                :title="ingredient"
                                dense
                            ></v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="12" sm="6" class="bg-background">
                        <v-list dense class="bg-background">
                            <v-list-subheader>Steps</v-list-subheader>
                            <v-list-item
                                v-for="(step, index) in recipe.steps"
                                :key="index"
                                :title="step"
                                dense
                            ></v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
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
