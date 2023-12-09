<script lang="ts" setup>
import useDoctorFetch from '@/services/DoctorService';
import { onMounted } from 'vue';

const { doctors, fetchDoctors, isLoading } = useDoctorFetch();

onMounted(async () => {
  await fetchDoctors();
});

</script>

<template>
  <div class="table-responsive">
  


    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Primer Nombre</th>
          <th scope="col">Primer Apellido</th>
          <th scope="col">Correo Electronico</th>
          <th scope="col">Tipo de usuario</th>
        </tr>
      </thead>
      <tbody>


        <tr v-for="doctor in doctors" :key="doctor.id" v-if="!isLoading">
          <th scope="row">{{ doctor.id }}</th>
          <td>{{ doctor.firstName }}</td>
          <td>{{ doctor.lastName }}</td>
          <td>{{ doctor.email }}</td>
          <td>Personal Medico</td>
        </tr>

       
        <tr v-if="doctors.length === 0 && isLoading">
          <td colspan="5">No hay registros</td>
        </tr>

      </tbody>
    </table>

  </div>
</template>

<style scoped></style>