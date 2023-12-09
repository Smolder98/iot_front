<script lang="ts" setup>

import TableDoctors from '@/views/doctor/partials/TableDoctors.vue';
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between mb-4 ">
      <h1>Personal de salud</h1>
      <a href="#" class="btn btn-primary my-auto">Nuevo</a>
    </div>

    <TableDoctors />

  </div>
</template>

<style scoped></style>