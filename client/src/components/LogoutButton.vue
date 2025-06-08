<template>
  <v-btn color="primary" @click="handleLogout">Log out</v-btn>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
const { logout } = useAuth0()

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>
