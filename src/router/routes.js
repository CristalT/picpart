export default [
  {
    path: '/',
    component: () => import('@/pages/PicturesPage.vue'),
    name: 'pictures',
  },
  {
    path: '/picture',
    component: () => import('@/pages/CreatePicture.vue'),
    name: 'picture.create',
  },
  {
    path: '/picture/:id',
    component: () => import('@/pages/OpenPicture.vue'),
    name: 'picture.open',
  }
];
