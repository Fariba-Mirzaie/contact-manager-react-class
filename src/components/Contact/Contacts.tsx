import { Link } from "react-router-dom";
import { Spinner, ContactItem, NotFound } from "../../components";
import { useContext, useEffect, useState } from "react";
import { getAllContacts } from "../../services/contactService";
import { Contact } from "./contact.type";
import { ContactContext } from "../../context/contactContext";

export default function Contacts() {
  const [loading, setLoading] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { searchText } = useContext(ContactContext);

  useEffect(() => {
    fetchData();
  }, [searchText]);

  async function fetchData() {
    setLoading(true);
    let allContacts: Contact[] = await getAllContacts();

    if (searchText)
      allContacts = allContacts.filter((f) => f.name.includes(searchText));

    setContacts(allContacts);
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
