<script lang="ts" setup>
import usePatientFetch from '@/services/PatientService';
import { onMounted } from 'vue';

const { patients, fetchPatients, isLoading } = usePatientFetch();

onMounted(async () => {
  await fetchPatients();
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
          <th scope="col">DNI</th>
          <th scope="col">Dispositivo</th>
          <th scope="col">Fecha de nacimiento</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="patient in patients" :key="patient.id" v-if="!isLoading">
          <th scope="row">{{ patient.id }}</th>
          <td>{{ patient.firstName }}</td>
          <td>{{ patient.lastName }}</td>
          <td>{{ patient.dni }}</td>
          <td>{{ patient.deviceCode }}</td>
          <td>{{ patient.birthdate }}</td>

          <td>
            <!-- <a href="#" class="btn btn-warning btn-sm">Editar</a>  -->
            <!-- <span> | </span> -->
            <router-link :to="{name: 'patient.assign', params: { id: patient.id }}" class="btn btn-secondary btn-sm">Dispositivo</router-link>
            <span> | </span>
            <router-link :to="{name: 'measure', params: { id: patient.id }}" class="btn btn-warning btn-sm">Mediciones</router-link>
          </td>
        </tr>


        <tr v-if="patients.length === 0 && isLoading">
          <td colspan="7">
            <div class="d-flex justify-content-center" >
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>

        <tr v-if="patients.length === 0 && !isLoading">
          <td colspan="5">No hay registros</td>
        </tr>

      </tbody>
    </table>

  </div>
</template>

<style scoped></style>