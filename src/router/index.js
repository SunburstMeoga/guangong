import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import personal from './personal'
const routes = [
    ...home,
    ...personal
]

export default createRouter({
    history: createWebHistory(),
    routes
})