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
  dataSet: {
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
      label: 'Temperatura',
      backgroundColor: '#f87979',
      data: props.dataSet || [10, 20, 30],
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
        label: 'Temperatura',
        backgroundColor: '#f87979',
        data: newP.dataSet || [10, 20, 30],
      }
    ]
  }
})

</script>

<template>
  <div>
    <Line id="chart-temp" :options="options" :data="chartData" />
  </div>
</template>

<style scoped></style>