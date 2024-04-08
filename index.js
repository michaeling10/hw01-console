const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const contacts = require("./contacts");

// Función para invocar la acción correspondiente
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await contacts.listContacts();
      break;

    case "get":
      await contacts.getContactById(id);
      break;

    case "add":
      await contacts.addContact(name, email, phone);
      break;

    case "remove":
      await contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// Llamada a la función invokeAction con los argumentos proporcionados
invokeAction(argv).catch(console.error);
