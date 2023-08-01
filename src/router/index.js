import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/home')
    },
    {
        path: '/market/:id',
        name: 'market',
        component: () => import('@/views/home/market')
    }
]

export default createRouter({
    history: createWebHashHistory(),
    routes
})