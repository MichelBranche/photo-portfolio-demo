import { useEffect } from "react";
import { initFooterCreditReveal } from "../gallery/footer-credit-reveal.js";

export default function Footer() {
  useEffect(() => initFooterCreditReveal(), []);

  return (
    <footer className="footer footer--lite" role="contentinfo">
      <div className="footer__inner">
        <p className="footer__line">
          Portfolio - Made By{" "}
          <a
            className="footer__credit-link"
            href="https://portfolio-three-ruby-wf4uz6dmu1.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michel Branche
          </a>
        </p>
      </div>
    </footer>
  );
}
