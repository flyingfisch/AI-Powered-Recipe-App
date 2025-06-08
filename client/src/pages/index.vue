<template>
  <v-container class="text-center" v-if="!isAuthenticated">
    <v-row>
      <v-col>
        <h1>Welcome to the AI Powered Recipe App</h1>
        <p>Please log in to continue.</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <v-btn @click="handleLogin">Log in</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-if="isAuthenticated">
    <v-row>
      <v-col>
        <h1>Welcome, {{ user?.name }}</h1>
        <p>You are logged in!</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center">
        <v-btn @click="handleLogout">Log out</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0()

const handleLogin = () => {
  loginWithRedirect({
    appState: { target: '/recipes' },
    authorizationParams: {
      redirect_uri: `${window.location.origin}/callback`,
      scope: 'openid profile email read:recipes',
    },
  })
}

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>
