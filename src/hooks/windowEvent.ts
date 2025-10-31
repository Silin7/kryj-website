import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useWindowEvent() {
  const windowWidth = ref(window.innerWidth)
  const windowScrollY = ref(window.scrollY)

  function updateWindowWidth() {
    windowWidth.value = window.innerWidth
  }

  function handleScroll() {
    windowScrollY.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('resize', updateWindowWidth)
    window.addEventListener('scroll', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWindowWidth)
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    windowWidth,
    windowScrollY,
  }
}
