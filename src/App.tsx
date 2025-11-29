import ContactList from "./components/ContactList";
import Nav from "./components/Nav";
import { useLocalStorage } from "./hooks";
import "./App.css";

function App() {
  useLocalStorage();

  return (
    <main>
      <Nav />
      <ContactList />
    </main>
  );
}

export default App;
