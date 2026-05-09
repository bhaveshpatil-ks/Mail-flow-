import { useEffect, useState } from "react";
import "../App.css";

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
    const savedContacts =
      JSON.parse(localStorage.getItem("contacts")) || [];

    setContacts(savedContacts);

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setSenderName(user.name || "");
      setSenderEmail(user.email || "");
    }
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
        "http://localhost:5000/api/email/send",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

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

      const history =
        JSON.parse(localStorage.getItem("history")) || [];

      const newHistory = [
        {
          id: Date.now(),
          to,
          subject,
          message,
          senderEmail,
          date: new Date().toLocaleString(),
          status: "Sent",
        },

        ...history,
      ];

      localStorage.setItem(
        "history",
        JSON.stringify(newHistory)
      );

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