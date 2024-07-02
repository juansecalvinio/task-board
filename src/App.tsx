import { Column } from "./components";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  );
}

export default App;
