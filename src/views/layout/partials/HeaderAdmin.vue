<script lang="ts" setup>
import { useUserStore } from '@/stores/user';

const useUser = useUserStore();

const logout = () => {
  useUser.logout();
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">

        <router-link :to="{ name: 'home' }">
          <img width="100" src="/images/logo-cruz-roja.png" class="navbar-brand" alt="imagen logo">
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">

            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'doctor.list' }">Medicos</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'patient.list' }">Pacientes</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'device.list' }">Dispositivos</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'sendMail' }">Email</router-link>
            </li>

            <li class="nav-item">
              <a class="nav-link text-danger" href="#" @click="logout">Cerrar sesion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>


</template>