import "./App.css";
import { UserContext } from "./UserContext";
import Application from "./Application";

function App() {
  return (
    <UserContext>
      <Application />
    </UserContext>
  );
}

export default App;
