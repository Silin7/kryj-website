import { ref } from 'vue'
import { defineStore } from 'pinia'

const useHeaderStore = defineStore('counter', () => {
  const selectedTab = ref(window.localStorage.getItem('selectedTab') || 'home')

  function setSelectedTab(name: string) {
    selectedTab.value = name
  }

  return { selectedTab, setSelectedTab }
})

export default useHeaderStore
