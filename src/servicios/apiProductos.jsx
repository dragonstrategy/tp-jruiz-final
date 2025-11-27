

// Endpoint de MockAPI
const URL_BASE = 'https://6925daf982b59600d7257738.mockapi.io/jr/productos'

// Imagen por defecto si no hay URL
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x200?text=Producto'

export async function obtenerProductos() {
  try {
    const res = await fetch(URL_BASE)
    if (!res.ok) throw new Error('Error al cargar productos')

    const data = await res.json()

    return data.map((p) => ({
      id: String(p.id),
      nombre: p.nombre || 'Sin nombre',
      precio: Number(p.precio) || 0,
      categoria: p.categoria || 'varios',
      descripcion: p.descripcion || '',
      image: p.image || PLACEHOLDER_IMAGE,
    }))
  } catch (error) {
    console.error('obtenerProductos:', error)
    // Fallback local por si MockAPI falla
    return [
      {
        id: '101',
        nombre: 'Camiseta (respaldo)',
        precio: 15.99,
        categoria: 'ropa',
        descripcion: 'Producto de prueba.',
        image: PLACEHOLDER_IMAGE,
      },
      {
        id: '102',
        nombre: 'Pantalón (respaldo)',
        precio: 29.5,
        categoria: 'ropa',
        descripcion: 'Producto de prueba.',
        image: PLACEHOLDER_IMAGE,
      },
    ]
  }
}

export async function obtenerProductoPorId(id) {
  try {
    const res = await fetch(`${URL_BASE}/${id}`)
    if (!res.ok) throw new Error('Error al cargar el producto')

    const p = await res.json()

    return {
      id: String(p.id),
      nombre: p.nombre || 'Sin nombre',
      precio: Number(p.precio) || 0,
      categoria: p.categoria || 'varios',
      descripcion: p.descripcion || '',
      image: p.image || PLACEHOLDER_IMAGE,
    }
  } catch (error) {
    console.error('obtenerProductoPorId:', error)
    return {
      id,
      nombre: 'Producto (respaldo)',
      precio: 9.99,
      descripcion: 'Sin descripción.',
      categoria: 'varios',
      image: PLACEHOLDER_IMAGE,
    }
  }
}

export async function crearProducto(datos) {
  const res = await fetch(URL_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('Error al crear producto')
  const p = await res.json()
  return {
    id: String(p.id),
    nombre: p.nombre,
    precio: Number(p.precio),
    categoria: p.categoria,
    descripcion: p.descripcion,
    image: p.image || PLACEHOLDER_IMAGE,
  }
}

export async function actualizarProducto(id, datos) {
  const res = await fetch(`${URL_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('Error al actualizar producto')
  const p = await res.json()
  return {
    id: String(p.id),
    nombre: p.nombre,
    precio: Number(p.precio),
    categoria: p.categoria,
    descripcion: p.descripcion,
    image: p.image || PLACEHOLDER_IMAGE,
  }
}

export async function eliminarProducto(id) {
  const res = await fetch(`${URL_BASE}/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar producto')
  return true
}
