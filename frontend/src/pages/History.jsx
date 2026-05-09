import { useEffect, useState } from "react";
import "../App.css";
import API_BASE_URL from "../config/api";
import { getAuthHeaders, getAuthToken } from "../config/auth";

function History() {
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      if (!getAuthToken()) {
        setStatus("Please log in to view history");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/history`, {
          headers: getAuthHeaders(),
        });
        const data = await response.json();

        if (!response.ok) {
          setStatus(data.message || "Failed to load history");
          return;
        }

        setHistory(data.history || []);
      } catch (error) {
        setStatus("Backend offline or history unavailable");
      }
    };

    fetchHistory();
  }, []);

  const clearHistory = async () => {
    setStatus("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/history`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus(data.message || "Failed to clear history");
        return;
      }

      setHistory([]);
      setStatus("History cleared successfully");
    } catch (error) {
      setStatus("Backend offline or history unavailable");
    }
  };

  return (
    <div className="historyPage">
      <div className="historyHeader">
        <span className="badge">Email History</span>
        <h1>Sent campaign history</h1>
        <p>View all emails sent from your MailFlow dashboard.</p>
      </div>

      <div className="historyCard">
        <div className="historyTop">
          <h2>Recent Emails</h2>
          <button onClick={clearHistory}>Clear History</button>
        </div>

        {status && <h4 className="authStatus">{status}</h4>}

        {history.length === 0 ? (
          <p className="emptyText">No emails sent yet.</p>
        ) : (
          <div className="historyList">
            {history.map((item) => (
              <div className="historyRow" key={item._id}>
                <div>
                  <h3>{item.subject}</h3>
                  <p>To: {item.to}</p>
                  <p>{new Date(item.createdAt).toLocaleString()}</p>
                </div>

                <span className={item.status === "Sent" ? "sent" : "failed"}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
