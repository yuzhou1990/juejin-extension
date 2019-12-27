export default http => ({
    fetch_gold(args) {
        return http.post('/resources/gold', args)
    }
})