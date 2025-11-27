import { useParams, Link } from 'react-router-dom'

export default function Categoria({ productos }) {
  const { categoria } = useParams()
  const lista = productos.filter((p) => (p.categoria || '').toLowerCase() === categoria.toLowerCase())

  return (
    <section className="caja">
      <h2>Categoría: {categoria}</h2>
      {lista.length === 0 ? (
        <p className="aviso">No hay productos en esta categoría.</p>
      ) : (
        <ul className="lista-productos">
          {lista.map((p) => (
            <li key={p.id} className="item-producto">
              <div className="info">
                <strong><Link to={`/productos/${p.id}`} className="link-producto">{p.nombre}</Link></strong>
                <span className="precio">${p.precio.toFixed(2)}</span>
              </div>
              <Link to={`/productos/${p.id}`} className="btn">Ver</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
