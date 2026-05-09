import { useEffect, useState } from "react";
import "../App.css";
import API_BASE_URL from "../config/api";
import { getAuthHeaders, getAuthToken } from "../config/auth";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!getAuthToken()) {
        setStatus("Please log in to manage contacts");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/contacts`, {
          headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (!response.ok) {
          setStatus(data.message || "Failed to load contacts");
          return;
        }

        setContacts(data.contacts || []);
      } catch (error) {
        setStatus("Backend offline or contacts unavailable");
      }
    };

    fetchContacts();
  }, []);

  const addContact = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: "POST",
        headers: getAuthHeaders({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Failed to add contact");
        setLoading(false);
        return;
      }

      setContacts((prevContacts) => [data.contact, ...prevContacts]);
      setName("");
      setEmail("");
      setStatus("Contact added successfully");
    } catch (error) {
      setStatus("Backend offline or contacts unavailable");
    }

    setLoading(false);
  };

  const deleteContact = async (id) => {
    setStatus("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Failed to delete contact");
        return;
      }

      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
      setStatus("Contact deleted successfully");
    } catch (error) {
      setStatus("Backend offline or contacts unavailable");
    }
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

            <button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Contact"}
            </button>
          </form>

          {status && <h4 className="authStatus">{status}</h4>}
        </div>

        <div className="contactsListCard">
          <h2>Saved Contacts</h2>

          {contacts.length === 0 ? (
            <p className="emptyText">No contacts added yet.</p>
          ) : (
            <div className="contactsList">
              {contacts.map((contact) => (
                <div className="contactRow" key={contact._id}>
                  <div>
                    <h3>{contact.name}</h3>
                    <p>{contact.email}</p>
                  </div>

                  <button onClick={() => deleteContact(contact._id)}>
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
