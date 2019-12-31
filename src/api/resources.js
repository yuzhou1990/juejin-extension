export default http => ({
    fetch_gold(args) {
        return http.post('/resources/gold', args)
    },
    fetch_github(args) {
        return http.post('/resources/github', args)
    },
})