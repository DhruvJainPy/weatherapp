import "./App.css";
import City from "./Components/City";
import Header from "./Components/Header";

function App() {
  return (
    <div className="container-fluid cold" style={{ minHeight: "100vh" }}>
      <div className="row p-3 p-md-4">
        <Header />
      </div>
      <div className="row p-3">
        <City />
      </div>
    </div>
  );
}

export default App;
