const {MarkovMachine} = require('./markov');

let testText = 'this is test text test text testing test functionality'
let mm = new MarkovMachine(testText);

test('Should form the correct object', ()=>{
    // test the keys
    console.log(mm.chains);
    expect(mm.chains['this']).toBeDefined()
    expect(mm.chains['is']).toBeDefined()
    expect(mm.chains['test']).toBeDefined()
    expect(mm.chains['text']).toBeDefined()
    expect(mm.chains['testing']).toBeDefined()

    expect(mm.chains['functionality']).toBeUndefined()

    // test the arrays
    expect(mm.chains['this']).toContain('is')
    expect(mm.chains['is']).toContain('test')
    expect(mm.chains['test']).toContain('text')
    expect(mm.chains['text']).toContain('testing')
    expect(mm.chains['testing']).toContain('test')
    expect(mm.chains['test']).toContain('functionality')

    expect(mm.chains['functionality']).toBeUndefined()
})