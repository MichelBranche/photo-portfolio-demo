/**
 * Link di navigazione header con label spezzata in lettere (animazione GSAP).
 */
export default function NavLink({
  href,
  id,
  label,
  words,
  ariaLabel,
  hidden,
  className = "",
}) {
  const wordList = words || [label];

  return (
    <a
      href={href}
      id={id}
      className={`header-nav-link ${className}`.trim()}
      aria-label={ariaLabel || label}
      hidden={hidden || undefined}
    >
      <span className="header-nav-link__plus" aria-hidden="true">
        +
      </span>
      <span className="header-nav-link__label" data-nav-animate="true">
        {wordList.map((word) => (
          <span key={word} className="header-nav-link__word">
            {word.split("").map((ch, i) => (
              <span key={`${word}-${i}`} className="header-nav-link__char">
                {ch}
              </span>
            ))}
          </span>
        ))}
      </span>
    </a>
  );
}
