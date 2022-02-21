export default {
  api: {
    url: process.env.API_URL || 'http://localhost:3001',
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
