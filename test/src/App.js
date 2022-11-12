import './App.css';
import Timeout from './pages/timeout';
import Interval from './pages/interval';
import APITest from './pages/api-test';
import { SimpleClock } from './pages/simple-clock';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timeout />
        <Interval />
        <APITest />
        <SimpleClock />
      </header>
    </div>
  );
}

export default App;
