import {
  AddContact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";
import { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAllGroups } from "./services/contactService";
import "./App.css";
import { ContactContext } from "./context/ContactContext";

function App() {
  const { setGroups } = useContext(ContactContext);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const allGroups = await getAllGroups();
    setGroups(allGroups);
  }

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contact/add" element={<AddContact />} />
        <Route path="/contact/view/:id" element={<ViewContact />} />
        <Route path="/contact/edit/:id" element={<EditContact />} />
      </Routes>

      {/* <Link to="/sidebar" /><Route path="/sidebar" element={<SidebarExam />} /> */}
    </div>
  );
}

export default App;
