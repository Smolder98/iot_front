<script lang="ts" setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue';

const userStore = useUserStore()
const email = ref('admin@admin.com')
const password = ref('admin')

const login = async () => {
   await userStore.login(email.value, password.value)
}

</script>

<template>
  <div class="row mt-5">
    <div class="col-md-6 mx-auto p-5 border rounded">
      <h1 class="text-center">Inicio de sesión</h1>

      <form @submit.prevent="login">

        <div class="mb-3">
          <label for="inputEmail" class="form-label">Correo</label>
          <input type="email" v-model="email" class="form-control" id="inputEmail" aria-describedby="emailHelp"
            value="admin@example.com" name="email">
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">Contraseña</label>
          <input type="password" v-model="password" class="form-control" id="inputPassword" value="password" name="password">
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
        <!-- <router-link to="/home" class="btn btn-primary">Enviar</router-link> -->
      </form>
    </div>
  </div>
</template>

<style scoped></style>