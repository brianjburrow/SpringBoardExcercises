import { render } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

test('renders learn react link', () => {
  render(<NewBoxForm />);
});

 // snapshot test
 it("matches snapshot", function(){
     const {asFragment} = render(<NewBoxForm addBox={()=>console.log("hello")}/>);
     expect(asFragment).toMatchSnapshot();
 })