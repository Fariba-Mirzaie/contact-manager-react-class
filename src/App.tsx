import {
  AddContact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAllGroups } from "./services/contactService";
import "./App.css";
import { Group } from "./components/Contact/contact.type";

function App() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const groups = await getAllGroups();
    setGroups(groups);
  }

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contact/add" element={<AddContact groups={groups} />} />
        <Route path="/contact/view/:id" element={<ViewContact />} />
        <Route
          path="/contact/edit/:id"
          element={<EditContact groups={groups} />}
        />
      </Routes>
    </div>
  );
}

export default App;
