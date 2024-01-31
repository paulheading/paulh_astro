const GET_USER_ARTICLES = `
    query GetUserArticles($page: Int!) {
        user(username: "paulheading") {
            publication {
                posts(page: $page) {
                    title
                    brief
                    slug
                }
            }
        }
    }
`

export { GET_USER_ARTICLES }
