<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { router } from '@/router';
import { IPatient } from '@/interfaces/patient.interface';
import usePatientFetch from '@/services/PatientService';
import TableReadings from '@/views/measurement/partials/TableReadings.vue';

const patient = ref({} as IPatient);
const { findById } = usePatientFetch();


const isLoading = ref(false);
const errors = ref({} as any);
// const message = ref('');



onMounted(async () => {
  isLoading.value = true;
  const { id } = router.currentRoute.value.params;

  if (!id || isNaN(Number(id))) {
    router.push({ name: 'patients.list' });
    return;
  }

  patient.value = await findById(id as string);
  if (patient.value.id === undefined) {
    errors.value = {
      error: 'Error al cargar el paciente'
    }
  }

  isLoading.value = false;
});
</script>

<template>
  <div class="container mt-5 border rounded">
    <div class="row">
      <h1 class="text-center">Mediciones</h1>

      <div class="row mb-4">
        <div class="col-md-6">
          <label class="ms-3">Primer Nombre</label>
          <input type="text" class="form-control" :value="patient.firstName" disabled>
        </div>
        <div class="col-md-6">
          <label class="ms-3">Primer Apellido</label>
          <input type="text" class="form-control" :value="patient.lastName" disabled>
        </div>

        <div class="col-md-12 mt-2">
          <label class="ms-3">DNI</label>
          <input type="text" class="form-control" :value="patient.dni" disabled>
        </div>
      </div>



      <TableReadings v-if="patient.id !== undefined"  :id="patient.id + ''" />

    </div>

  </div>
</template>

<style scoped></style>