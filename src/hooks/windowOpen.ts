function windowOpen(url: any, istourl: boolean = true) {
  if (!url || !istourl) {
    return
  }
  window.open(url, '_blank')
}

export default windowOpen
