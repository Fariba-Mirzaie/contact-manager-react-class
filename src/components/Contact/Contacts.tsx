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
  useTransition,
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

  const [isPending, startTransition] = useTransition();
  const [filteredResult, setFilteredResult] = useState<Contact[]>([]);

  const deferredSearch = useDeferredValue(searchText);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    startTransition(() => {
      // const start = performance.now();
      // while (performance.now() - start < 800) {}

      let count = 0;
      while (count === 30000) count++;

      if (!deferredSearch) setFilteredResult(contacts);

      if (deferredSearch) {
        const result = contacts.filter(
          (f) =>
            f.name.includes(deferredSearch) ||
            f.family.includes(deferredSearch),
        );
        setFilteredResult(result);
      }
    });
  }, [deferredSearch]);

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

  // const contactsCount = useMemo(() => {
  //   return filteredContacts?.length;
  // }, [filteredContacts]);

  async function fetchData() {
    setLoading(true);
    const allContacts = await getAllContacts();
    setContacts(allContacts);
    setFilteredResult(allContacts);
    setLoading(false);
  }

  return (
    <>
      {isPending && <h5>در حال فیلتر </h5>}

      {isFirstRender.current && (
        <h1 style={{ color: "green", fontSize: 36, fontWeight: 600 }}>
          Welcome to contact app
        </h1>
      )}
      {/* <h4 style={{ color: "blue" }}> تعداد کل مخاطبین:{contactsCount} </h4> */}
      <Link to="/contact/add">
        <button className="btn">ایجاد مخاطب</button>
      </Link>
      <div className="contacts">
        {loading ? (
          <Spinner />
        ) : filteredResult && filteredResult.length > 0 ? (
          filteredResult.map((contact, index) => (
            <div
              key={contact.id}
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
