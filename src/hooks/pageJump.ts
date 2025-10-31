import router from '@/router'
import backToTop from './backToTop'

function pageJump(name: any, query?: any) {
  backToTop()
  router.push({
    name,
    query
  })
}

export default pageJump
