const Links = [
    {
        path: '/dashboard/home',
        title: 'Mural',
        icon: 'home',
        extended: false,
        auth: [1]
    },
    {
        path: '/dashboard/transaction',
        title: 'Transações',
        icon: 'list',
        extended: false,
        auth: [2]
    },
    {
        path: '/dashboard/ranking',
        title: 'Ranking',
        icon: 'format_list_numbered',
        extended: true,
        children: [
            {
                path: '/dashboard/ranking/honesty',
                title: 'Honestidade'
            },
            {
                path: '/dashboard/ranking/punctuation',
                title: 'Pontuação'
            }
        ],
        auth: [1]
    }
]

export default Links