<script lang="ts" setup>
import { defineProps, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

const props = defineProps({
  labels: {
    type: Array
  },
  dataSet1: {
    type: Array
  },
  dataSet2: {
    type: Array
  }
})

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

let chartData = {
  labels: props.labels || ['a', 'b', 'c'],
  datasets: [
    {
      label: 'Sistolica',
      backgroundColor: '#74BEFF',
      data: props.dataSet1 || [10, 20, 30],
    },
    {
      label: 'Diastolica',
      backgroundColor: '#89FF74',
      data: props.dataSet2 || [10, 20, 30],
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}


watch(props, (newP, _) => {

  chartData = {
    labels: newP.labels || ['a', 'b', 'c'],
    datasets: [
      {
        label: 'Presion Arterial',
        backgroundColor: '#74BEFF',
        data: newP.dataSet1 || [10, 20, 30],
      },
      {
        label: 'Presion Arterial',
        backgroundColor: '#89FF74',
        data: newP.dataSet2 || [10, 20, 30],
      }
    ]
  }
})

</script>

<template>
  <div>
    <Line id="arterial" :options="options" :data="chartData" />
  </div>
</template>

<style scoped></style>