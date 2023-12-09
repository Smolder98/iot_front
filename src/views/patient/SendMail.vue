<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import useDoctorFetch from '@/services/DoctorService';
import usePatientFetch from '../../services/PatientService';


const isLoading = ref(false);
const errors = ref({} as any);
const message = ref('');

const { doctors, fetchDoctors, sendMail, errors: errorsDoctor, message: messageDoctor, isLoading: isLoadingDoctor } = useDoctorFetch();
const { patients, fetchPatients } = usePatientFetch();

const idDoctor = ref('');
const idPatient = ref('');


onMounted(async () => {
  isLoading.value = true;

  await fetchDoctors();
  await fetchPatients();

  isLoading.value = false;
});

const handleSubmit = async () => {
  isLoading.value = true;

  await sendMail(idPatient.value, idDoctor.value);

  if ( errorsDoctor.value && Object.keys(errorsDoctor.value).length !== 0) {
    errors.value = errorsDoctor.value;
  }

  message.value = messageDoctor.value;

  isLoading.value = isLoadingDoctor.value;

};

</script>

<template>
  <div class="row mt-5 mx-md-5 ">
    <div class="col-md-6 border rounded mx-auto">
      <h1>Envio de datos por correo</h1>

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
          <label for="inputDevice" class="form-label">Paciente <span class="text-danger">*</span></label>
          <select id="inputDevice" class="form-select" v-model="idPatient" required :disabled="isLoading">
            <option value="">Seleccionar paciente</option>
            <option v-for="patient in patients" :key="patient.id" :value="patient.id">{{ patient.firstName }} {{
              patient.lastName }}</option>
          </select>
        </div>


        <div class="mb-3">
          <label for="inputDoctor" class="form-label">Personal de salud <span class="text-danger">*</span></label>
          <select id="inputDoctor" class="form-select" v-model="idDoctor" required :disabled="isLoading">
            <option value="">Seleccionar personal</option>
            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id"> Dr. {{ doctor.firstName }} {{
              doctor.lastName }}</option>
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