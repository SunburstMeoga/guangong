const personal = [
    {
        path: '/personal',
        name: 'personal',
        component: () => import ('@/views/personal/personal'),
        meta: {
            showBar: true
        }
    },
    {
        path: '/assets/:id',
        name: 'assets',
        component: () => import ('@/views/personal/details'),
        meta: {
            showBar: true
        }
    },
    
]

export default personal