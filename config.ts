export default {
  api: {
    url: '',
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
