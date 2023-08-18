import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import personal from './personal'
import recommend from './recommend'
const routes = [
    ...home,
    ...personal,
    ...recommend
]

export default createRouter({
    history: createWebHistory(),
    routes
})