import { useContext } from "react";
import { ContactContext } from "../../../context/ContactContext";

export default function SearchContact() {
  const { searchText, setSearchText } = useContext(ContactContext);

  return (
    <input
      type="text"
      placeholder="جستجوی مخاطب..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}
