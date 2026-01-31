import { useContext, useEffect, useRef } from "react";
import { ContactContext } from "../../../context/ContactContext";

export default function SearchContact() {
  const { searchText, setSearchText } = useContext(ContactContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <input
      type="text"
      placeholder="جستجوی مخاطب..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      ref={inputRef}
    />
  );
}
