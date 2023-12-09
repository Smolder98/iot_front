<script lang="ts" setup>
// import { useUserStore } from '@/stores/user';
// const useUser = useUserStore();

// console.log(useUser.user);
</script>


<template>
  <component :is="$route.meta.layout || 'div'">
    <router-view />
  </component>
</template>