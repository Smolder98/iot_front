<script lang="ts" setup>
import { onMounted, onUnmounted, ref, defineProps, computed } from 'vue';
import useReadignFetch from '../../../services/ReadingServices';
import Graphs from './Graphs.vue';
import { IReadings } from '../../../interfaces/readings.interface';
import * as moment from 'moment-timezone';
import GraphTemp from './GraphTemp.vue';
import GraphPresArterial from './GraphPresArterial.vue';


const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const { readigns: data, fetchReadings, isLoading } = useReadignFetch();

const readigns = ref<IReadings[]>([]);

const maxTemp = ref(0);
const maxFrecuencyCardiac = ref(0);
const pressure_blood = ref('0');
const oxgin_saturation = ref(0);

let interval = 0;

const fetchData = async () => {

  if (props.id === undefined) {
    return;
  }
  await fetchReadings(props.id);

  readigns.value = [...data.value];

  if (readigns.value.length > 0) {
    maxTemp.value = Math.max(...readigns.value.map(reading => reading.temperature));
  }

  if (readigns.value.length > 0) {
    maxFrecuencyCardiac.value = Math.max(...readigns.value.map(reading => reading.frequency_cardiac));
  }

  if (readigns.value.length > 0) {
    const maxSistolic = Math.max(...readigns.value.map(reading => reading.pressure_sistolic));
    pressure_blood.value = `${maxSistolic}/${readigns.value[readigns.value.length - 1].pressure_diastolic}`;
  }

  if (readigns.value.length > 0) {
    oxgin_saturation.value = Math.min(...readigns.value.map(reading => reading.oxygen_saturation));
  }



};

onMounted(async () => {
  console.log('Componente montado');
  await fetchData();

  interval = setInterval(async () => {
    await fetchData();
  }, 20 * 1000);
});

onUnmounted(() => {
  console.log('Componente desmontado');
  clearInterval(interval);
});


// graficos

const getLabels = computed(() => {
  const arrayReversed = [...readigns.value].reverse();
  return arrayReversed.map(reading => moment(reading.created_at).format('DD/MM HH:mm:ss'));
});

const getValuesTemp = computed(() => {
  const arrayReversed =[...readigns.value].reverse();
  return arrayReversed.map(reading => reading.temperature);
});

const getValuesSistolic = computed(() => {
  const arrayReversed =[...readigns.value].reverse();
  return arrayReversed.map(reading => reading.pressure_sistolic);
});

const getValuesDiastolic = computed(() => {
  const arrayReversed =[...readigns.value].reverse();
  return arrayReversed.map(reading => reading.pressure_diastolic);
});

</script>

<template>
  <Graphs :maxTemp="maxTemp" :maxFrecuencyCardiac="maxFrecuencyCardiac" :pressure_blood="pressure_blood"
    :oxgin_saturation="oxgin_saturation" />



  <div class="row  rounded p-0 mx-2 mt-5" v-if="readigns.length > 0">
    <div class="col-md-6">
      <GraphTemp :labels="getLabels" :dataSet="getValuesTemp" />
    </div>

    <div class="col-md-6">
      <GraphPresArterial :labels="getLabels" :dataSet1="getValuesSistolic" :dataSet2="getValuesDiastolic" />
    </div>
  </div>


  <div class="table-responsive mt-5">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Temperatura</th>
          <th scope="col">Frecuencia Cardíaca</th>
          <th scope="col">Presion sanguinea</th>
          <th scope="col">Saturacion de oxigeno</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>


        <tr v-for="reading in readigns" :key="reading.id" v-if="!isLoading">
          <th scope="row">{{ reading.id }}</th>
          <td>{{ reading.temperature }} °C</td>
          <td>{{ reading.frequency_cardiac }} ppm</td>
          <td>{{ reading.pressure_sistolic }} / {{ reading.pressure_diastolic }}</td>
          <td>{{ reading.oxygen_saturation }} %</td>
          <td>{{ moment(reading.created_at).tz('America/Tegucigalpa').format('DD/MM/YYYY HH:mm:ss') }}</td>


        </tr>

        <tr v-if="readigns.length === 0 && isLoading">
          <td colspan="7">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </td>
        </tr>

        <tr v-if="readigns.length === 0 && !isLoading">
          <td colspan="6">No hay registros</td>
        </tr>

      </tbody>
    </table>

  </div>
</template>

<style scoped></style>