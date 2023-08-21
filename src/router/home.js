const home = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/home'),
        meta: {
            showBar: true
        }
    },
    {
        path: '/market/:id',
        name: 'market',
        component: () => import('@/views/home/details'),
        meta: {
            showBar: true
        }
    },
    {
        path: '/good/:id',
        name: 'good',
        component: () => import('@/views/home/details'),
        meta: {
            showBar: true
        }
    },
    {
        path: '/nfts/mall',
        name: 'mall/list',
        component: () => import('@/views/home/nfts'),
        meta: {
            showBar: true
        }
    },
    {
        path: '/nfts/market',
        name: 'market/list',
        component: () => import('@/views/home/nfts'),
        meta: {
            showBar: true
        }
    },
    {
        path: '/checkout/:id',
        name: 'checkout',
        component: () => import('@/views/home/checkout'),
        meta: {
            showBar: false
        }
    }
]

 export default home