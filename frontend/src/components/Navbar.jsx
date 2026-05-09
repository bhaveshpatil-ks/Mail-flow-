import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [hideNav, setHideNav] = useState(false);
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      setUser(savedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userLogin", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userLogin", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHideNav(true);
        setOpenProfile(false);
      } else {
        setHideNav(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpenProfile(false);
    window.dispatchEvent(new Event("userLogin"));
    navigate("/login");
  };

  return (
    <>
      <nav className={`navbar ${hideNav ? "navHidden" : ""}`}>
        <Link to="/" className="logo">MailFlow</Link>

        <div className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/send-campaign">Send</Link>
          <Link to="/contacts">Contacts</Link>
          <Link to="/history">History</Link>
        </div>

        <div className="navActions">
          {!user ? (
            <>
              <Link to="/login" className="loginBtn">Log in</Link>
              <Link to="/signup" className="signupBtn">Start Free</Link>
            </>
          ) : (
            <div className="profileArea">
              <button
                className="profileBtn"
                onClick={() => setOpenProfile(!openProfile)}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </button>

              {openProfile && (
                <div className="profileMenu">
                  <div className="profileInfo">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                  </div>

                  <Link to="/dashboard" onClick={() => setOpenProfile(false)}>
                    Dashboard
                  </Link>

                  <Link to="/pricing" onClick={() => setOpenProfile(false)}>
                    Pricing
                  </Link>

                  <Link to="/send-campaign" onClick={() => setOpenProfile(false)}>
                    Send Campaign
                  </Link>

                  <Link to="/contacts" onClick={() => setOpenProfile(false)}>
                    Contacts
                  </Link>

                  <Link to="/history" onClick={() => setOpenProfile(false)}>
                    History
                  </Link>

                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <nav className="mobileBottomNav">
        <Link to="/">Home</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/dashboard">Dash</Link>
        <Link to="/send-campaign">Send</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/history">History</Link>
      </nav>
    </>
  );
}

export default Navbar;
