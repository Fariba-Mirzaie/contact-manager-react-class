import { useState } from "react";
import { ContactContext } from "./ContactContext";
import { Group } from "../components/Contact/contact.type";

type ContactProviderProps = {
  children: React.ReactNode;
};

export default function ContactProvider({ children }: ContactProviderProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);

  return (
    <ContactContext.Provider
      value={{
        searchText,
        setSearchText,
        loading,
        setLoading,
        groups,
        setGroups,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}
