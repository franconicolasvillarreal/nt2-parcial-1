import { createWebHistory, createRouter } from 'vue-router'

import Formulario from '../components/Formulario.vue'
import Gastos from '../components/Gastos.vue'
import Choice from '../components/Choice.vue'

const routes = [
    { path: '/', name: 'Inicio', component: Formulario },
    { path: '/formulario', name: 'Formulario', component: Formulario },
    { path: '/gastos', name: 'Gastos', component: Gastos },
    { path: '/choice', name: 'Choice', component: Choice }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router