<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';

const useUser = useUserStore();

const name = ref('')

onMounted(async () => {
    name.value = useUser.user.name || 'Invitado';
});


const logout = () => {
    useUser.logout();
};
</script>

<template>
    <div class="container mt-5">
        <div class="p-5 mb-4 bg-light rounded-3">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Control de pacientes Manager</h1>
                <p class="col-md-8 fs-4">
                    Hola, {{ name }}
                </p>
                <a class="btn btn-primary btn-lg" href="#" role="button" @click="logout">Cerrar sesión</a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>