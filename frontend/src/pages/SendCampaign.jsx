import { useEffect, useState } from "react";
import "../App.css";
import API_BASE_URL from "../config/api";
import { getAuthHeaders, getAuthToken } from "../config/auth";

function SendCampaign() {
  const [contacts, setContacts] = useState([]);

  const [selectedEmail, setSelectedEmail] = useState("");
  const [customEmail, setCustomEmail] = useState("");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPageData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        setSenderName(user.name || "");
        setSenderEmail(user.email || "");
      }

      if (!getAuthToken()) {
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/contacts`, {
          headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (response.ok) {
          setContacts(data.contacts || []);
        }
      } catch (error) {
        // Keep the page usable even if contacts fail to load.
      }
    };

    loadPageData();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    setStatus("");
    setLoading(true);

    const to = selectedEmail || customEmail;

    if (!to) {
      setStatus("Please select or enter receiver email");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/email/send`,
        {
          method: "POST",

          headers: getAuthHeaders({
            "Content-Type": "application/json",
          }),

          body: JSON.stringify({
            to,
            subject,
            message,
            senderName,
            senderEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Email sending failed");
        setLoading(false);
        return;
      }

      setStatus("Email sent successfully");

      setSelectedEmail("");
      setCustomEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus("Backend offline or email service issue");
    }

    setLoading(false);
  };

  return (
    <div className="campaignPage">
      <div className="campaignCard">
        <span className="badge">Send Campaign</span>

        <h1>Create new email</h1>

        <p>
          Send professional campaigns using MailFlow
          delivery system.
        </p>

        <form onSubmit={sendEmail}>
          <input
            type="text"
            placeholder="Your name"
            value={senderName}
            onChange={(e) =>
              setSenderName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Reply email"
            value={senderEmail}
            onChange={(e) =>
              setSenderEmail(e.target.value)
            }
          />

          <select
            value={selectedEmail}
            onChange={(e) =>
              setSelectedEmail(e.target.value)
            }
          >
            <option value="">
              Select saved contact
            </option>

            {contacts.map((contact) => (
              <option
                key={contact.id}
                value={contact.email}
              >
                {contact.name} - {contact.email}
              </option>
            ))}
          </select>

          <input
            type="email"
            placeholder="Or enter custom email"
            value={customEmail}
            onChange={(e) =>
              setCustomEmail(e.target.value)
            }
            disabled={selectedEmail !== ""}
          />

          <input
            type="text"
            placeholder="Email subject"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            required
          />

          <textarea
            placeholder="Write your message"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>

        {status && <h4>{status}</h4>}
      </div>
    </div>
  );
}

export default SendCampaign;
