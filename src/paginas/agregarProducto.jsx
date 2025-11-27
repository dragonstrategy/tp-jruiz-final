import { useState } from 'react'
import { usarProductos } from '../contexto/contextoProductos.jsx'
import { Caja, PanelError } from '../styled/ui.jsx'
import { toast } from 'react-toastify'

export default function AgregarProducto() {
  const { crearProducto } = usarProductos()

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [image, setImage] = useState('')
  const [mensaje, setMensaje] = useState(null)
  const [cargando, setCargando] = useState(false)

  const manejarSubmit = async (e) => {
    e.preventDefault()
    setMensaje(null)

    const errores = []

    if (!nombre.trim()) errores.push('El nombre es obligatorio.')
    const valorPrecio = Number(precio)
    if (Number.isNaN(valorPrecio) || valorPrecio <= 0) {
      errores.push('El precio debe ser un número mayor a 0.')
    }
    if (!categoria.trim()) errores.push('La categoría es obligatoria.')
    if (descripcion.trim().length < 10) {
      errores.push('La descripción debe tener al menos 10 caracteres.')
    }
    if (!image.trim()) {
      errores.push('Ingresá una URL de imagen.')
    }

    if (errores.length > 0) {
      const msg = errores.join(' ')
      setMensaje(msg)
      toast.error(msg)
      return
    }

    const nuevoProducto = {
      nombre: nombre.trim(),
      precio: valorPrecio,
      categoria: categoria.trim(),
      descripcion: descripcion.trim(),
      image: image.trim(),
    }

    try {
      setCargando(true)
      const creado = await crearProducto(nuevoProducto)
      const msg = `Producto "${creado.nombre}" creado (ID: ${creado.id})`
      setMensaje(msg)
      toast.success(msg)

      setNombre('')
      setPrecio('')
      setCategoria('')
      setDescripcion('')
      setImage('')
    } catch (error) {
      const msg = 'Error al guardar el producto en MockAPI.'
      setMensaje(msg)
      toast.error(msg)
    } finally {
      setCargando(false)
    }
  }

  return (
    <Caja>
      <h2>Agregar producto</h2>

      <form className="formulario" onSubmit={manejarSubmit}>
        <label>
          <span>Nombre</span>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Camiseta básica"
          />
        </label>

        <label>
          <span>Precio</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Ej: 19.99"
          />
        </label>

        <label>
          <span>Categoría</span>
          <input
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            placeholder="Ej: ropa, calzado"
          />
        </label>

        <label>
          <span>Descripción</span>
          <textarea
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Detalles del producto..."
          />
        </label>

        <label>
          <span>Imagen (URL)</span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://mis-imagenes.com/producto.jpg"
          />
        </label>

        {mensaje && (
          <PanelError>
            <p>{mensaje}</p>
          </PanelError>
        )}
        {cargando && <p className="aviso">Guardando...</p>}

        <button className="btn" type="submit" disabled={cargando}>
          Guardar producto
        </button>
      </form>
    </Caja>
  )
}
