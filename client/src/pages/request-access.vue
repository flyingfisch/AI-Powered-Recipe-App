<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Welcome, {{ user?.name }}</h1>
        <p>You have not been granted access to this app. Request Access.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { user } = useAuth0()
</script>
