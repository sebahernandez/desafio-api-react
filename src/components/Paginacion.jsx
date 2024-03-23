import PropTypes from "prop-types";

export const Paginacion = ({
  sismosTotales,
  sismosPorPagina,
  paginar,
  paginaActual,
}) => {
  const numerosPagina = [];
  for (let i = 1; i <= Math.ceil(sismosTotales / sismosPorPagina); i++) {
    numerosPagina.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
          <a
            onClick={() => paginar(paginaActual - 1)}
            href="#!"
            className="page-link text-black"
          >
            Anterior
          </a>
        </li>
        {numerosPagina.map(
          (numero) =>
            (numero === paginaActual ||
              numero === 1 ||
              numero === numerosPagina.length ||
              Math.abs(numero - paginaActual) <= 1) && (
              <li
                key={numero}
                className={`page-item ${
                  numero === paginaActual ? "active" : ""
                }`}
              >
                <a
                  onClick={() => paginar(numero)}
                  href="#!"
                  className={`page-link ${
                    paginaActual === numero ? "texto-activo" : "texto-inactivo"
                  }`}
                >
                  {numero}
                </a>
              </li>
            )
        )}
        <li
          className={`page-item ${
            paginaActual === numerosPagina.length ? "disabled" : ""
          }`}
        >
          <a
            onClick={() => paginar(paginaActual + 1)}
            href="#!"
            className="page-link text-black"
          >
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

Paginacion.propTypes = {
  sismosTotales: PropTypes.number.isRequired,
  sismosPorPagina: PropTypes.number.isRequired,
  paginar: PropTypes.func.isRequired,
  paginaActual: PropTypes.number.isRequired,
};
