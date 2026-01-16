import { SearchProps } from "../../Navbar/Navbar";

export default function SearchContact({
  searchText,
  setSearchText,
}: SearchProps) {
  return (
    <input
      type="text"
      placeholder="جستجوی مخاطب..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}
