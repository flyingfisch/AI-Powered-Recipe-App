<template>
    <v-app :theme="theme">
        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title>AI Powered Recipe App</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn
                :icon="
                    theme === 'light'
                        ? 'mdi-weather-sunny'
                        : 'mdi-weather-night'
                "
                slim
                @click="handleThemeToggle"
            ></v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" temporary>
            <v-list nav>
                <v-list-item title="Recipes" link to="/"></v-list-item>
                <v-list-item
                    title="Shopping List"
                    link
                    to="/shopping-list"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const theme = ref(appStore.theme)
const drawer = ref(false)

function handleThemeToggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    appStore.setTheme(theme.value)
}
</script>
