import "../App.css";

function Dashboard() {
  return (
    <div className="dashboardPage">
      <div className="dashboardHeader">
        <span className="badge">Dashboard</span>
        <h1>Welcome back, Bhavesh</h1>
        <p>Track your email campaigns, contacts, and sending activity.</p>
      </div>

      <div className="dashboardStats">
        <div className="dashCard">
          <h3>Total Emails</h3>
          <h2>1,240</h2>
          <p>Sent campaigns</p>
        </div>

        <div className="dashCard">
          <h3>Contacts</h3>
          <h2>520</h2>
          <p>Saved recipients</p>
        </div>

        <div className="dashCard">
          <h3>Campaigns</h3>
          <h2>18</h2>
          <p>Total created</p>
        </div>

        <div className="dashCard">
          <h3>Success Rate</h3>
          <h2>98%</h2>
          <p>Email delivery focus</p>
        </div>
      </div>

      <div className="dashboardGrid">
        <div className="largePanel">
          <h2>Recent Campaigns</h2>

          <div className="campaignRow">
            <span>Welcome Offer</span>
            <p>Sent to 120 contacts</p>
          </div>

          <div className="campaignRow">
            <span>Product Update</span>
            <p>Sent to 80 contacts</p>
          </div>

          <div className="campaignRow">
            <span>Festival Sale</span>
            <p>Sent to 300 contacts</p>
          </div>
        </div>

        <div className="largePanel">
          <h2>Quick Actions</h2>

          <button>Send New Campaign</button>
          <button>Add Contacts</button>
          <button>View History</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;