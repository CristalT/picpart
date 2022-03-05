<template>
  <nav>
    <ul class="wrapper">
      <li>
        <router-link to="picture">
          Nueva Imagen
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
$bgc: rgb(26, 156, 128);
nav {
  background-color: $bgc;
  ul {
    li {
      a {
        color: #fff;
        padding: 12px 16px;
        display: inline-block;
        transition: all .5s ease;
        &:hover {
          background-color: lighten($bgc, 10%);
        }
      }
    }
  }
}
</style>