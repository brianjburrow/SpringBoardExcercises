import logo from './logo.svg';
import './App.css';
import RouteList from "./RouteList";


function App() {
  return (
    <div className="App">
      <RouteList/>
    </div>
  );
}

App.defaultProps = {colors: ['red', 'blue', 'green', 'black', 'orange', 'purple']}

export default App;
