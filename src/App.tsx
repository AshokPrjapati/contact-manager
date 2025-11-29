import ContactList from "./components/ContactList";
import Nav from "./components/Nav";
import "./App.css";
import { useContacts } from "./hooks/useContacts";

function App() {
  useContacts();

  return (
    <main>
      <Nav />
      <ContactList />
    </main>
  );
}

export default App;
