import { createContext, Dispatch, SetStateAction } from "react";
import { Group } from "../components/Contact/contact.type";

type ContactContextType = {
  searchText: string;
  loading: boolean;
  groups: Group[];
  setSearchText: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setGroups: Dispatch<SetStateAction<Group[]>>;
};
export const ContactContext = createContext<ContactContextType>({
  searchText: "",
  loading: false,
  groups: [],
  setSearchText: () => {},
  setLoading: () => {},
  setGroups: () => {},
});
