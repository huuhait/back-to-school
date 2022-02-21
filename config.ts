export default {
  api: {
    url: process.env.NODE_ENV === 'production' ? 'https://hhhyfw.sse.codesandbox.io' : 'http://localhost:3001',
  },
  page_rules: [
    {
      name: 'admin-*',
      header: false,
      footer: false,
    },
    {
      name: '*',
      header: true,
      footer: true,
    },
  ],
}
