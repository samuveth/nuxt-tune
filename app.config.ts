export default defineAppConfig({
  myLayer: {
    name: 'Hello from Nuxt layer'
  },
  nuxtIcon: {
    size: '24px'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
