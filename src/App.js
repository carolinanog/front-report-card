import './App.css';
import { SystemRouter } from './routes';

const someValue = "defaultValue"; // Define someValue

function App() {
  return (
    <div className="App">
      <SystemRouter someProp={someValue} />
    </div>
  );
}

export default App;
