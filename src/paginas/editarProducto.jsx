import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usarProductos } from '../contexto/contextoProductos.jsx'
import { Caja, PanelError } from '../styled/ui.jsx'
import { toast } from 'react-toastify'

export default function EditarProducto() {
  const { id } = useParams()
  const { productos, actualizarProducto } = usarProductos()

  const original = productos.find((p) => String(p.id) === String(id))

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [image, setImage] = useState('')
  const [mensaje, setMensaje] = useState(null)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (original) {
      setNombre(original.nombre || '')
      setPrecio(String(original.precio ?? ''))
      setCategoria(original.categoria || '')
      setDescripcion(original.descripcion || '')
      setImage(original.image || '')
    }
  }, [original])

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
    if (!image.trim()) errores.push('Ingresá una URL de imagen.')

    if (errores.length > 0) {
      const msg = errores.join(' ')
      setMensaje(msg)
      toast.error(msg)
      return
    }

    const datosActualizados = {
      nombre: nombre.trim(),
      precio: valorPrecio,
      categoria: categoria.trim(),
      descripcion: descripcion.trim(),
      image: image.trim(),
    }

    try {
      setCargando(true)
      await actualizarProducto(id, datosActualizados)
      const msg = 'Producto actualizado correctamente.'
      setMensaje(msg)
      toast.success(msg)
    } catch (error) {
      const msg = 'Error al actualizar el producto.'
      setMensaje(msg)
      toast.error(msg)
    } finally {
      setCargando(false)
    }
  }

  if (!original) {
    return (
      <Caja>
        <h2>Editar producto</h2>
        <p className="aviso">
          No se encontró el producto en la lista. Volvé a Productos.
        </p>
      </Caja>
    )
  }

  return (
    <Caja>
      <h2>Editar producto #{id}</h2>

      <form className="formulario" onSubmit={manejarSubmit}>
        <label>
          <span>Nombre</span>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
          />
        </label>

        <label>
          <span>Categoría</span>
          <input
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </label>

        <label>
          <span>Descripción</span>
          <textarea
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>

        <label>
          <span>Imagen (URL)</span>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        {mensaje && (
          <PanelError>
            <p>{mensaje}</p>
          </PanelError>
        )}
        {cargando && <p className="aviso">Guardando...</p>}

        <button className="btn" type="submit" disabled={cargando}>
          Guardar cambios
        </button>
      </form>
    </Caja>
  )
}
