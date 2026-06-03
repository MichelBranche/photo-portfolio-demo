import NavLink from "./NavLink.jsx";

export default function Header() {
  return (
    <header className="header header-bar" role="banner">
      <div className="header-bar__left">
        <div
          className="logo-container"
          id="logoReset"
          role="button"
          tabIndex={0}
          aria-label="Rubina Stradella — mostra tutte le foto"
        >
          <div className="logo-mark" aria-hidden="true">
            <span className="logo-letter logo-letter--r">R</span>
            <span className="logo-letter logo-letter--s">S</span>
          </div>
          <span className="logo-fullname" aria-hidden="true">
            Rubina Stradella
          </span>
        </div>
      </div>
      <nav className="header-bar__nav" aria-label="Navigazione principale">
        <NavLink
          href="#about"
          id="aboutNavLink"
          label="About me"
          words={["About", "me"]}
          ariaLabel="About me — vai alla biografia"
        />
        <NavLink
          href="#progetti"
          id="projectsNavLink"
          label="Progetti"
          ariaLabel="Progetti — elenco serie"
        />
        <NavLink
          href="#contatti"
          id="contactNavLink"
          label="Contatti"
          ariaLabel="Contatti — social e email"
        />
      </nav>
    </header>
  );
}
