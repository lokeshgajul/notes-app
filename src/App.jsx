import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import CreateNote from "./components/createNote";

function App() {
  return (
    <div className="bg-[#eaeaea] h-screen">
      <Navbar />
      <CreateNote />
    </div>
  );
}

export default App;
