import './App.css';
import Counter from './components/Counter/Counter';
import TodoHome from './components/TodoComp/TodoHome';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Counter app */}
        {/* <Counter /> */}

        {/* Todo app */}
        <TodoHome />
      </header>
    </div>
  );
}

export default App;
