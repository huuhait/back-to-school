export default {
  api: {
    url: 'http://localhost:3001',
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
