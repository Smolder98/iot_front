<script lang="ts" setup>
</script>

<template>
  <div class="row mt-5 mx-md-5 ">
    <div class="col-md-6 border rounded mx-auto">
      <h1>Editar Paciente</h1>

      <form method="POST" action="#">

        <div class="mb-3">
          <label for="inputFirstName" class="form-label">Primer nombre <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="inputFirstName" required>
        </div>

        <div class="mb-3">
          <label for="inputLastName" class="form-label">Primer apellido <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="inputLastName" required>
        </div>

        <div class="mb-3">
          <label for="inputDni" class="form-label">DNI <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="inputDni" required>
        </div>

        <div class="mb-3">
          <label for="inputBirthday" class="form-label">Fecha de nacimiento <span class="text-danger">*</span></label>
          <input type="date" class="form-control" id="inputBirthday" required>
        </div>

        <div class="d-flex gap-1 mb-3">
          <button type="submit" class="btn btn-primary">Guardar</button>
          <router-link :to="{ name: 'patient.list' }" class="btn btn-secondary">Cancelar</router-link>
        </div>
      </form>
    </div>

  </div>
</template>

<style scoped></style>