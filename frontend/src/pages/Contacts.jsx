import { useEffect, useState } from "react";
import "../App.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(savedContacts);
  }, []);

  const addContact = (e) => {
    e.preventDefault();

    const newContact = {
      id: Date.now(),
      name,
      email,
    };

    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    setName("");
    setEmail("");
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  return (
    <div className="contactsPage">
      <div className="contactsHeader">
        <span className="badge">Contacts</span>
        <h1>Manage your recipients</h1>
        <p>Add and organize people you want to send emails to.</p>
      </div>

      <div className="contactsGrid">
        <div className="contactFormCard">
          <h2>Add Contact</h2>

          <form onSubmit={addContact}>
            <input
              type="text"
              placeholder="Contact name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Add Contact</button>
          </form>
        </div>

        <div className="contactsListCard">
          <h2>Saved Contacts</h2>

          {contacts.length === 0 ? (
            <p className="emptyText">No contacts added yet.</p>
          ) : (
            <div className="contactsList">
              {contacts.map((contact) => (
                <div className="contactRow" key={contact.id}>
                  <div>
                    <h3>{contact.name}</h3>
                    <p>{contact.email}</p>
                  </div>

                  <button onClick={() => deleteContact(contact.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacts;