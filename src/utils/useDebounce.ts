import { ref } from 'vue'

const timeout: any = ref(null)

export default function useDebounce() {
  return {
    fn(fn: any, wait?: number) {
      if (timeout.value !== null) {
        clearTimeout(timeout.value)
      }
      timeout.value = setTimeout(fn, wait || 1000)
    },
  }
}
