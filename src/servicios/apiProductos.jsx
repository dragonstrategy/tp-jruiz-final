// src/servicios/apiProductos.jsx

// Endpoint de MockAPI
const URL_BASE = 'https://6925daf982b59600d7257738.mockapi.io/jr/productos'

// Imagen por defecto si no hay URL
const PLACEHOLDER_IMAGE = 'data:image/jpeg;base64,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'

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
    body: JSON.stringify(datos), // datos incluye image
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
    body: JSON.stringify(datos), // datos incluye image
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
