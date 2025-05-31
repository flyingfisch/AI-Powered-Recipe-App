<template>
  <v-layout>
    <v-app-bar title="AI Powered Recipes"></v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Recipes" link></v-list-item>
        <v-list-item title="Shopping List" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>

  <AppFooter />
</template>

<script lang="ts" setup>
//
</script>
