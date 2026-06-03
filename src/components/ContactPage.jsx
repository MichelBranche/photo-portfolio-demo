export default function ContactPage() {
  return (
    <section
      id="contatti"
      className="site-page contact-page"
      hidden
      aria-hidden="true"
    >
      <div className="site-page__inner contact-page__inner">
        <header className="site-page__head">
          <p className="site-page__kicker">Contatti</p>
          <h1 className="site-page__title">Restiamo in contatto</h1>
        </header>
        <div className="site-page__body contact-page__body">
          <section className="contact-page__block">
            <h2 className="site-page__h2">Instagram</h2>
            <ul className="site-page__list site-page__list--links">
              <li>
                <a
                  href="https://www.instagram.com/rubinastradella/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @rubinastradella
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/byapemaya/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @byapemaya — arte
                </a>
              </li>
            </ul>
          </section>
          <section className="contact-page__block">
            <h2 className="site-page__h2">Email e telefono</h2>
            <ul className="site-page__list site-page__list--links">
              <li>
                <a href="mailto:rubinastradella1d@gmail.com">
                  rubinastradella1d@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+393898721961">+39&nbsp;389&nbsp;872&nbsp;1961</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
