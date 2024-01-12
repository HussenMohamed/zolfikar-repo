<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';

</script>

<template>

    <Header />
    
    <RouterView class="content"/>

</template>

<style scoped>
.content{
  padding: 70px 50px;
  min-height: calc(100vh + 70px);
}
</style>
