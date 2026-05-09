import { useEffect, useState } from "react";
import "../App.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setHistory([]);
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

        {history.length === 0 ? (
          <p className="emptyText">No emails sent yet.</p>
        ) : (
          <div className="historyList">
            {history.map((item) => (
              <div className="historyRow" key={item.id}>
                <div>
                  <h3>{item.subject}</h3>
                  <p>To: {item.to}</p>
                  <p>{item.date}</p>
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