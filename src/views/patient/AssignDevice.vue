<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { IPatient } from '@/interfaces/patient.interface';
import usePatientFetch from '../../services/PatientService';
import { router } from '@/router';
import useDeviceFetch from '../../services/DeviceService';

const patient = ref({} as IPatient);

const { findById } = usePatientFetch();

const isLoading = ref(false);
const errors = ref({} as any);
const message = ref('');

const { devices, fetchDevices, assingDevice, errors: errorsDevice, message: messageDevice } = useDeviceFetch();

const idDevice = ref('');

onMounted(async () => {
  isLoading.value = true;
  await fetchDevices();

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

const handleSubmit = async () => {
  isLoading.value = true;
  if (patient.value.id === undefined) {
    errors.value = {
      error: 'Error al cargar el paciente'
    }
    return;
  }

  if (idDevice.value === '') {
    errors.value = {
      error: 'Selecciona un dispositivo'
    }
    return;
  }

  await assingDevice(patient.value.id, idDevice.value);


  if (Object.keys(errorsDevice.value).length !== 0) {
    errors.value = errorsDevice.value;
  }

  message.value = messageDevice.value;

  isLoading.value = false;

};

</script>

<template>
  <div class="row mt-5 mx-md-5 ">
    <div class="col-md-6 border rounded mx-auto">
      <h1>Asignacion de dispositivo</h1>

      <form @submit.prevent="handleSubmit">

        <div v-if="message" class="alert alert-success" role="alert">
          {{ message }}
        </div>

        <div v-if="Object.keys(errors).length > 0" class="alert alert-danger" role="alert">
          <ul>
            <li v-for=" error  in  errors " :key="error">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-3">
          <label for="inputFirstName" class="form-label">Primer nombre <span class="text-danger">*</span></label>
          <input type="text" v-model="patient.firstName" class="form-control" id="inputFirstName" disabled>
        </div>

        <div class="mb-3">
          <label for="inputLastName" class="form-label">Primer apellido <span class="text-danger">*</span></label>
          <input type="text" v-model="patient.lastName" class="form-control" id="inputLastName" disabled>
        </div>

        <div class="mb-3">
          <label for="inputDni" class="form-label">DNI <span class="text-danger">*</span></label>
          <input type="text" v-model="patient.dni" class="form-control" id="inputDni" disabled>
        </div>

        <div class="mb-3">
          <label for="inputBirthday" class="form-label">Fecha de nacimiento <span class="text-danger">*</span></label>
          <input type="date" v-model="patient.birthdate" class="form-control" id="inputBirthday" disabled>
        </div>

        <div class="mb-3">
          <label for="inputDevice" class="form-label">Dispositivo <span class="text-danger">*</span></label>
          <select id="inputDevice" class="form-select" v-model="idDevice" required :disabled="isLoading">
            <option value="">Seleccionar dispositivo</option>
            <option v-for="device in devices" :key="device.id" :value="device.id">{{ device.name }}</option>
          </select>
        </div>

        <div class="d-flex gap-1 mb-3">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">Guardar</button>
          <router-link :to="{ name: 'patient.list' }" class="btn btn-secondary">Volver</router-link>
        </div>
      </form>
    </div>

  </div>
</template>

<style scoped></style>