import { Link } from "react-router-dom";
import { Spinner, ContactItem, NotFound } from "../../components";
import { useEffect, useState } from "react";
import { getAllContacts } from "../../services/contactService";
import { Contact } from "./contact.type";

export default function Contacts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setContacts(await getAllContacts());
    setLoading(false);
  }

  return (
    <>
      <Link to="/contact/add">
        <button className="btn">ایجاد مخاطب</button>
      </Link>
      <div className="contacts">
        {loading ? (
          <Spinner />
        ) : contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <ContactItem
              key={index}
              contact={contact}
              reFetchData={fetchData}
            />
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
