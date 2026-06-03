export default function About() {
  return (
    <section
      id="about"
      className="site-page about-page"
      hidden
      aria-hidden="true"
    >
      <div className="site-page__inner about-page__inner">
        <header className="site-page__head about-page__head">
          <p className="site-page__kicker about-page__kicker">About</p>
          <h1 className="site-page__title about-page__title">Rubina Stradella</h1>
        </header>
        <div className="site-page__body about-page__body">
          <p className="about-page__p">
            Mi chiamo Rubina Maya, ho 23 anni e sono nata in Valle d’Aosta, dove
            sin da piccola ho coltivato la curiosità per l’arte e la fotografia.
          </p>
          <p className="about-page__p">
            Intraprendo gli studi al Liceo Artistico di Aosta e mi diplomo nel
            2021. Qui riesco a conoscere non solo il disegno, ma anche la storia
            dell’arte, la grafica e la fotografia, che già praticavo per conto
            mio.
          </p>
          <p className="about-page__p">
            Dall’ottobre del 2021 a settembre 2024 frequento la LABA di Brescia
            e a luglio 2025 ottengo il diploma accademico di primo livello in
            Fotografia, realizzando una tesi di laurea di ricerca sull’archivio
            fotografico di famiglia che s’intitola{" "}
            <cite className="about-page__cite">L’archivio ritrovato</cite>.
          </p>
          <p className="about-page__p">
            Adoro osservare, amo creare e mi affascinano le storie. Quelle
            fantastiche o quelle reali, di persone.
          </p>
          <p className="about-page__p">
            Sento di avere il compito di mantenere la memoria viva, che sia la
            mia, ascoltando e raccontando, che sia quella delle altre persone,
            creando fotografie che non sono solo immagini, ma sono veri e propri
            ricordi, perché come dice Roland Barthes:
          </p>
          <blockquote className="about-page__quote">
            <p>
              «La fotografia riproduce meccanicamente ciò che non potrà mai
              ripetersi».
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
