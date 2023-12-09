<script lang="ts" setup>
defineProps({
  maxTemp: {
    type: Number,
    default: 0
  },
  maxFrecuencyCardiac: {
    type: Number,
    default: 0
  },
  pressure_blood: {
    type: String,
    default: '0'
  },
  oxgin_saturation: {
    type: Number,
    default: 0
  }
})

</script>

<template>
  <div class="row">

    <div class="col-md-3 ">
      <!-- card -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Temperatura Maxima</h5>
          <p class="card-text">{{ maxTemp }} °C</p>
        </div>
      </div>
    </div>

    <div class="col-md-3 ">
      <!-- card -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Frec. cardiaca maxima</h5>
          <p class="card-text">{{ maxFrecuencyCardiac }} ppm</p>
        </div>
      </div>
    </div>

    <div class="col-md-3 ">
      <!-- card -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Presion arterial</h5>
          <p class="card-text">{{ pressure_blood }}</p>
        </div>
      </div>
    </div>

    <div class="col-md-3 ">
      <!-- card -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Spo2 minima</h5>
          <p class="card-text">{{ oxgin_saturation }} %</p>
        </div>
      </div>
    </div>






  </div>
</template>

<style scoped></style>