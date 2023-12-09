<script lang="ts" setup>
import useDeviceFetch from '../../../services/DeviceService';
import { onMounted } from 'vue';

const { devices, fetchDevices, isLoading } = useDeviceFetch();

onMounted(async () => {
  await fetchDevices();
});



</script>

<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Codigo</th>
          <th scope="col">status</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="device in devices" :key="device.id" v-if="!isLoading">
          <th scope="row">{{ device.id }}</th>

          <td>{{ device.name }}</td>
          <td>{{ device.description }}</td>
          <td>{{ device.code }}</td>

          <td :class="device.status ? 'text-success' : 'text-danger'" class="">
            {{ device.status ? 'Activo' : 'Inactivo' }}
          </td>
        </tr>


        <tr v-if="devices.length === 0 && isLoading">
          <td colspan="7">
            <div class="d-flex justify-content-center" >
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>

        <tr v-if="devices.length === 0 && !isLoading">
          <td colspan="5">No hay registros</td>
        </tr>

      </tbody>
    </table>

  </div>
</template>

<style scoped></style>