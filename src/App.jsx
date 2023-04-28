import "./App.css";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";

function App() {
  return (
    <div className="App-header-container">
      <Header />
      <div className="App-container">
        <Main />
      </div>
    </div>
  );
}

export default App;
