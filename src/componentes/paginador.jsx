
export default function Paginador({ paginaActual, totalPaginas, onCambiarPagina }) {
  if (totalPaginas <= 1) return null

  const paginas = []
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i)
  }

  const irAPagina = (n) => {
    if (n < 1 || n > totalPaginas) return
    onCambiarPagina(n)
  }

  return (
    <nav aria-label="Paginador de productos">
      <ul className="pagination justify-content-center mt-3">
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => irAPagina(paginaActual - 1)}
            aria-label="Página anterior"
          >
            &laquo;
          </button>
        </li>

        {paginas.map((n) => (
          <li
            key={n}
            className={`page-item ${n === paginaActual ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => irAPagina(n)}
              aria-label={`Ir a la página ${n}`}
            >
              {n}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            paginaActual === totalPaginas ? 'disabled' : ''
          }`}
        >
          <button
            className="page-link"
            onClick={() => irAPagina(paginaActual + 1)}
            aria-label="Página siguiente"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  )
}
