// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light',
  }),
  actions: {
    setTheme(newTheme: string) {
      this.theme = newTheme
    },
  },
  persist: true,
})
