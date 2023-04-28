import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_ERROR,
    DESCARGA_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_ERROR
} from '../types'
// importamos axios
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto())

        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);

            // Si todo sale bien, actualizar el state
            dispatch(agregarProductoExito(producto));

            //Alerta
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'El producto se agrego correctamente',
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            console.log(error);
            // si hay un error cambiar el state
            dispatch(agregarProductoError(true));

            // alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: 'Hubo un error intentea de nuevo',
                confirmButtonText: 'Confirmar'
            })

        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});


// Funcion que descarga los productos de la BD
export function obtenerProductosActions() {
    return async (dispatch) => {
        dispatch(descargarProductos())

        try {
            setTimeout(async () => {
                const respuesta = await clienteAxios.get('/productos')
                dispatch(descargaProductosExitosa(respuesta.data))
            }, 1000);
        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente.',
                'success',
                'Confirmar'
            )
        } catch (error) {
            dispatch(eliminarProductoError())
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la api y state
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoExito(producto))
        } catch (error) {
            dispatch( editarProductoError())
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = (producto) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})