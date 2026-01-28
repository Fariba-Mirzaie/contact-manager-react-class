import { createContext } from "react";

export const ContactContext = createContext({
  isLoading: false,
  searchText: "",
  setSearchText: (value: string) => [],
  groups: [],
  setGroups: (value: []) => [],
});
