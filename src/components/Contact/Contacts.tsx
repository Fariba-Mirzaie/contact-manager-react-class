import { Link } from "react-router-dom";
import { Spinner, ContactItem, NotFound } from "../../components";
import {
  useContext,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getAllContacts } from "../../services/contactService";
import { Contact } from "./contact.type";
import { ContactContext } from "../../context/ContactContext";

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { searchText, loading, setLoading } = useContext(ContactContext);
  const isFirstRender = useRef<boolean>(true);
  const newContactRef = useRef<Record<string, HTMLDivElement | null>>({});
  // if (isFirstRender.current) isFirstRender.current = false; in useeffect

  const deferredSearch = useDeferredValue(searchText);

  useEffect(() => {
    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (contacts.length > 0) {
      const lastContact = contacts[contacts.length - 1];
      const lastRef = newContactRef.current[lastContact.id];

      if (lastRef) {
        lastRef.style.backgroundColor = "#636364ff";
        lastRef.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    if (!deferredSearch) return contacts;

    if (deferredSearch) {
      return contacts.filter(
        (f) =>
          f.name.includes(deferredSearch) || f.family.includes(deferredSearch),
      );
    }
  }, [contacts, deferredSearch]);

  const contactsCount = useMemo(() => {
    return filteredContacts?.length;
  }, [filteredContacts]);

  async function fetchData() {
    setLoading(true);
    setContacts(await getAllContacts());
    setLoading(false);
  }

  return (
    <>
      {isFirstRender.current && (
        <h1 style={{ color: "green", fontSize: 36, fontWeight: 600 }}>
          Welcome to contact app
        </h1>
      )}
      <h4 style={{ color: "blue" }}> تعداد کل مخاطبین:{contactsCount} </h4>
      <Link to="/contact/add">
        <button className="btn">ایجاد مخاطب</button>
      </Link>
      <div className="contacts">
        {loading ? (
          <Spinner />
        ) : filteredContacts && filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <div
              key={index}
              ref={(el) => {
                newContactRef.current[contact.id] = el;
              }}
            >
              <ContactItem contact={contact} reFetchData={fetchData} />
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
