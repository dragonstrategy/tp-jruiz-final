import { Helmet } from "react-helmet"
import { Caja } from '../styled/ui.jsx'

export default function Inicio() {
  return (
    <Caja>
      <Helmet>
        <title>Inicio – Mi Tienda Simple</title>
        <meta
          name="description"
          content="Inicio de Mi Tienda Simple. Descubrí productos y ofertas."
        />
      </Helmet>

 
      <div className="hero-contenedor">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="Presentación de la tienda"
          className="hero-imagen"
        />

        <div className="hero-texto">
          <h2>Bienvenidos a Mi Tienda Simple</h2>
          <p>Los mejores productos al mejor precio.</p>
        </div>
      </div>


      <h2 style={{ marginTop: "1.5rem" }}>Bienvenido</h2>
      <p>Explorá nuestros productos y armá tu carrito.</p>
    </Caja>
  )
}
