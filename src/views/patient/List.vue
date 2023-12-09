<script lang="ts" setup>
import TablePatients from './partials/TablePatients.vue';

</script>

<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between mb-4 ">
      <h1>Lista de Pacientes</h1>
      <router-link :to="{ name: 'patient.create' }" class="btn btn-primary my-auto">Nuevo</router-link>
    </div>

    <TablePatients />

  </div>
</template>

<style scoped></style>