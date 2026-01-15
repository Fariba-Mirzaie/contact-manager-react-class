import { Contact } from "../components/Contact/contact.type";

const BASE_URL = "http://localhost:9000" as const;

//contacts
async function getAllContacts() {
  const response = await fetch(`${BASE_URL}/contacts`);
  return await response.json();
}
async function getContact(id: number) {
  const response = await fetch(`${BASE_URL}/contacts/${id}`);
  return await response.json();
}
async function addContact(contact: Contact) {
  const response = await fetch(`${BASE_URL}/contacts/`, {
    method: "POST",
    body: JSON.stringify(contact),
  });

  return response;
}
async function editContact(id: number, contact: Contact) {
  const response = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(contact),
  });
  return response.json();
}
async function deleteContact(id: number) {
  const response = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}

//groups
async function getAllGroups() {
  const response = await fetch(`${BASE_URL}/groups`);
  return await response.json();
}
async function getGroup(id: number) {
  const response = await fetch(`${BASE_URL}/groups/${id}`);
  return response.json();
}

export {
  getAllContacts,
  getContact,
  addContact,
  editContact,
  deleteContact,
  getAllGroups,
  getGroup,
};
