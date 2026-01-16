import {
  AddContact,
  Contacts,
  EditContact,
  Navbar,
  ViewContact,
} from "./components";
import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { getAllGroups } from "./services/contactService";
import "./App.css";
import { Group } from "./components/Contact/contact.type";
import SidebarExam from "./components/sidebar/SidebarExam";

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const groups = await getAllGroups();
    setGroups(groups);
  }

  return (
    <div className="app">
      <Link to="/sidebar" />
      {/* <Navbar searchText={searchText} setSearchText={setSearchText} /> */}

      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={<Contacts searchText={searchText} />}
        />
        <Route path="/contact/add" element={<AddContact groups={groups} />} />
        <Route path="/contact/view/:id" element={<ViewContact />} />
        <Route
          path="/contact/edit/:id"
          element={<EditContact groups={groups} />}
        />
        <Route path="/sidebar" element={<SidebarExam />} />
      </Routes>
    </div>
  );
}

export default App;
