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
    },
    {
        path: '/good/:id',
        name: 'good',
        component: () => import('@/views/home/details')
    },
    {
        path: '/checkout/:id',
        name: 'checkout',
        component: () => import('@/views/home/checkout')
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})