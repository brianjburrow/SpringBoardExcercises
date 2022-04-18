import { render } from '@testing-library/react';
import BoxList from './BoxList';

test('renders learn react link', () => {
  render(<BoxList />);
});


// snapshot test
it("matches snapshot", function(){
    const {asFragment} = render(<BoxList/>);
    expect(asFragment).toMatchSnapshot();
})

