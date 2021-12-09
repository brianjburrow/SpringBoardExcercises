describe('running tests for tvmaze', function () {
    beforeEach(function () {
    })

    it('should correctly return an episode of House', async function () {
        let object = await searchShows('house');

        expect(object[0].name).toEqual('House')
    })


    afterEach(function () {

    })
})