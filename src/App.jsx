import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./pages/Main/MainPage";

function App() {
  return (
    <div className="App-header-container">
      <Header />
      <div className="App-container">
        <MainPage />
      </div>
    </div>
  );
}

export default App;
