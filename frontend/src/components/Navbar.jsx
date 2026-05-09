import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [hideNav, setHideNav] = useState(false);
  const [user, setUser] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/send-campaign", label: "Send" },
    { to: "/contacts", label: "Contacts" },
    { to: "/history", label: "History" },
  ];

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

  useEffect(() => {
    setOpenProfile(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setOpenProfile(false);
    window.dispatchEvent(new Event("userLogin"));
    navigate("/login");
  };

  const renderDesktopMenu = () => (
    <div className="profileMenu">
      <div className="profileInfo">
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>

      {navItems.slice(1).map((item) => (
        <Link key={item.to} to={item.to} onClick={() => setOpenProfile(false)}>
          {item.label}
        </Link>
      ))}

      <button onClick={logout}>Logout</button>
    </div>
  );

  const renderMobileMenu = () => (
    <div className="profileMenu mobileProfileMenu">
      <div className="mobileMenuHero">
        <div className="mobileMenuAvatar">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <div className="profileInfo mobileProfileInfo">
          <h4>{user.name}</h4>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="mobileMenuLinks">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={location.pathname === item.to ? "activeMobileLink" : ""}
            onClick={() => setOpenProfile(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );

  return (
    <>
      <nav className={`navbar ${hideNav ? "navHidden" : ""}`}>
        <Link to="/" className="logo">MailFlow</Link>

        <div className="navLinks">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
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

              {openProfile && renderDesktopMenu()}
            </div>
          )}
        </div>
      </nav>

      <nav className="mobileTopNav">
        <Link to="/" className="logo mobileLogo">MailFlow</Link>

        <div className="mobileTopActions">
          {!user ? (
            <Link to="/login" className="profileBtn mobileProfileLink">
              U
            </Link>
          ) : (
            <div className="profileArea">
              <button
                className="profileBtn"
                onClick={() => setOpenProfile(!openProfile)}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </button>

              {openProfile && renderMobileMenu()}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
