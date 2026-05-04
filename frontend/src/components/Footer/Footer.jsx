import "./Footer.css";

function Footer() {
  return (
    <footer className="py-6 bg-secondary-50 flex flex-col gap-8 text-neutral-400 text-sm">
      <div className="max-w-250 px-8 flex justify-between py-10">
        <section className="footer-section">
          <em className="footer-headline">Tomato.</em>
          <p>
            Connecting you with the best neighborhood flavors,
            <br />
            delivered fast and fresh right to your door.
          </p>
        </section>
        <section className="footer-section">
          <em className="footer-headline">Company</em>
          <ul className="footer-links">
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">Delivery Details</a>
            </li>
            <li>
              <a href="">Privacy Policy</a>
            </li>
            <li>
              <a href="">Terms & Conditions</a>
            </li>
          </ul>
        </section>
        <section className="footer-section">
          <em className="footer-headline">Get in touch</em>
          <ul className="footer-links">
            <li>
              <a href="">+1-212-456-7890</a>
            </li>
            <li>
              <a href="">contact@tomato.com</a>
            </li>
          </ul>
        </section>
      </div>
      <hr className="text-neutral-200" />
      <div className="px-8">© 2024 Tomato. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
