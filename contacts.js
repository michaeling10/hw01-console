const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function loadContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function listContacts() {
  const contacts = await loadContacts();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await loadContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  console.log(contact);
}

async function removeContact(contactId) {
  const contacts = await loadContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
  console.log(`Contact with ID ${contactId} has been removed.`);
}

async function addContact(name, email, phone) {
  const contacts = await loadContacts();
  const newContact = {
    id: Math.random().toString(36).substring(2, 15),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`Contact ${name} has been added.`);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
