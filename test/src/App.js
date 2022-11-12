import './App.css';
import Timeout from './pages/timeout';
import Interval from './pages/interval';
import GetRequest from './pages/get-request';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timeout />
        <Interval />
        <GetRequest />
      </header>
    </div>
  );
}

export default App;
