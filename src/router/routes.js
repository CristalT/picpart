export default [
  {
    path: '/',
    component: () => import('@/pages/PicturesPage.vue'),
    name: 'pictures',
  },
  {
    path: '/picture/:id?',
    component: () => import('@/pages/PicturePage.vue'),
    name: 'picture',
  },
];
