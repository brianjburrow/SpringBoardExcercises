import { render} from '@testing-library/react';
import Box from './Box';

test('renders learn react link', () => {
  render(<Box />);
});


// snapshot test
it("matches snapshot", function(){
    const {asFragment} = render(<Box color="blue" width="400px" height="100px" delete={()=>console.log('test')}/>);
    expect(asFragment).toMatchSnapshot();
})

