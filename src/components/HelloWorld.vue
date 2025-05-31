<template>
  <v-container>
    <h1>App Content</h1>

    <v-select
      label="Select Cuisines"
      v-model="selectedCuisines"
      items="cuisines"
      multiple
    ></v-select>

    <v-btn>Generate Recipes!</v-btn>
  </v-container>

</template>

<script setup lang="ts">
const selectedCuisines = ref<string[]>([]);

const cuisines = ref<string[]>([
  'Italian',
  'Chinese',
  'Mexican',
  'Indian',
  'French',
  'Japanese',
  'Mediterranean',
  'American'
]);
</script>
