<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { faker } from '@faker-js/faker';
import { IPatient } from '@/interfaces/patient.interface';
import usePatientFetch from '../../services/PatientService';

const patient = ref({} as IPatient);

const { createPatient, isLoading, errors, message } = usePatientFetch();

onMounted(() => {
  patient.value.firstName = faker.person.firstName();
  patient.value.lastName = faker.person.lastName();
  patient.value.dni = faker.number.int({ min: 1000000000000, max: 9999999999999 }) + '';
  patient.value.birthdate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0];
});

const handleSubmit = async () => {
  await createPatient(patient.value);

  if (Object.keys(errors.value).length === 0) {
    patient.value.firstName = '';
    patient.value.lastName = '';
    patient.value.dni = '';
    patient.value.birthdate = '';
  }
};

</script>

<template>
  <div class="row mt-5 mx-md-5 ">
    <div class="col-md-6 border rounded mx-auto">
      <h1>Nuevo Paciente</h1>

      <form @submit.prevent="handleSubmit">

        <div v-if="message" class="alert alert-success" role="alert">
          {{ message }}
        </div>

        <div v-if=" Object.keys(errors).length > 0 " class="alert alert-danger" role="alert">
          <ul>
            <li v-for=" error  in  errors " :key=" error ">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-3">
          <label for="inputFirstName" class="form-label">Primer nombre <span class="text-danger">*</span></label>
          <input type="text" v-model=" patient.firstName " class="form-control" id="inputFirstName" required>
        </div>

        <div class="mb-3">
          <label for="inputLastName" class="form-label">Primer apellido <span class="text-danger">*</span></label>
          <input type="text" v-model=" patient.lastName " class="form-control" id="inputLastName" required>
        </div>

        <div class="mb-3">
          <label for="inputDni" class="form-label">DNI <span class="text-danger">*</span></label>
          <input type="text" v-model=" patient.dni " class="form-control" id="inputDni" required>
        </div>

        <div class="mb-3">
          <label for="inputBirthday" class="form-label">Fecha de nacimiento <span class="text-danger">*</span></label>
          <input type="date" v-model=" patient.birthdate " class="form-control" id="inputBirthday" required>
        </div>

        <div class="d-flex gap-1 mb-3">
          <button type="submit" class="btn btn-primary" :disabled=" isLoading ">Guardar</button>
          <router-link :to=" { name: 'patient.list' } " class="btn btn-secondary">Volver</router-link>
        </div>
      </form>
    </div>

  </div>
</template>

<style scoped></style>