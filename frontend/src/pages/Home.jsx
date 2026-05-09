import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  const startSending = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/send-campaign");
    } else {
      navigate("/signup");
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="site">
      <section className="hero">
        <motion.div
          className="heroContent"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="badge">Smart Email Automation</span>

          <h1>Send bulk emails with premium automation.</h1>

          <p>
            Create campaigns, manage contacts, send professional emails, and
            track performance from one clean dashboard.
          </p>

          <div className="heroButtons">
            <button className="primaryBtn" onClick={startSending}>
              Start Sending Free
            </button>

            <button
              className="secondaryBtn"
              onClick={() => scrollToSection("features")}
            >
              View Features
            </button>
          </div>
        </motion.div>

        <motion.div
          className="heroVisual"
          initial={{ opacity: 0, scale: 0.8, x: 80 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="emailCard"
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <div className="cardHeader">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <h3>Campaign Preview</h3>

            <div className="inputBox">To: customers@example.com</div>
            <div className="inputBox">Subject: Welcome Offer</div>

            <div className="messageBox">
              Hello customer,
              <br />
              We are excited to share our latest offer with you.
            </div>

            <button className="sendBtn" onClick={startSending}>
              Send Campaign
            </button>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        className="sectionTitle"
        id="features"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span>Powerful Features</span>
        <h2>Everything you need in one platform.</h2>
      </motion.section>

      <section className="features">
        {[
          {
            title: "Email Campaigns",
            desc: "Send premium professional campaigns with a smooth workflow.",
          },
          {
            title: "Contact Management",
            desc: "Save and organize contacts for future email campaigns.",
          },
          {
            title: "Campaign History",
            desc: "Track all previously sent campaigns with timestamps.",
          },
          {
            title: "Secure Authentication",
            desc: "JWT authentication and encrypted user accounts.",
          },
        ].map((item, index) => (
          <motion.div
            className="featureCard"
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
            }}
            viewport={{ once: true }}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="workflow" id="about">
        <motion.div
          className="workflowText"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span>About MailFlow</span>

          <h2>Built for modern email automation.</h2>

          <p>
            MailFlow helps businesses, creators, and marketers send professional
            emails, manage contacts, and track campaigns from a clean premium
            dashboard.
          </p>

          <button className="primaryBtn workflowBtn" onClick={startSending}>
            Create Campaign
          </button>
        </motion.div>

        <div className="workflowCards">
          <motion.div
            className="stepCard"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            01. Add Contacts
          </motion.div>

          <motion.div
            className="stepCard"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            02. Write Email
          </motion.div>

          <motion.div
            className="stepCard"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            03. Send Campaign
          </motion.div>
        </div>
      </section>

      <section className="pricingSection" id="pricing">
        <span className="badge">Pricing</span>

        <h2>Premium plans are coming soon.</h2>

        <p>
          We are building powerful plans with bulk email sending, analytics,
          templates, and campaign scheduling.
        </p>

        <button disabled>Coming Soon</button>
      </section>

      <section className="supportSection" id="support">
        <div className="sectionTitle">
          <span>Help & Support</span>
          <h2>Need help? We are here for you.</h2>
        </div>

        <div className="features supportGrid">
          <div className="featureCard">
            <h3>Support</h3>
            <p>Get help with campaigns, contacts, and account issues.</p>
          </div>

          <div className="featureCard">
            <h3>Privacy Policy</h3>
            <p>Your account data and email activity are handled securely.</p>
          </div>

          <div className="featureCard">
            <h3>Terms & Conditions</h3>
            <p>Use MailFlow responsibly for permission-based emails only.</p>
          </div>

          <div className="featureCard">
            <h3>Contact</h3>
            <p>Future support email and live chat system will be added soon.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <h2>MailFlow</h2>
          <p>Smart email automation platform for modern businesses.</p>
        </div>

        <div className="footerLinks">
          <a href="#about">About</a>
          <a href="#pricing">Pricing</a>
          <a href="#support">Support</a>
          <a href="#support">Privacy Policy</a>
          <a href="#support">Terms & Conditions</a>
        </div>

        <p className="copyright">© 2026 MailFlow. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;