import logo from './logo.svg';
import './App.css';
import { choice, remove } from './helpers';
import foods from './foods';

function App() {
  const selection = choice(foods);
  console.log(selection)
  console.log(foods);
  const remainingFood = remove(foods, selection);
  console.log(remainingFood)
  return (
    <div className="App">
      <div>I'd like to have one {selection}</div>
      <div>Here you go {selection}</div>
      <div>Delicious, may i have another?</div>
      <div>I'm sorry, we're all out.  We have:</div>
      <ul>
        {remainingFood.map(food => <li key={food}>{food}</li>)}
      </ul>
    </div>
  );
}

export default App;
