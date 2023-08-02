import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/home')
    },
    {
        path: '/market/:id',
        name: 'market',
        component: () => import('@/views/home/details')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})