import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions';


const NuevoProducto = () => {
    const navigate = useNavigate()

    // state del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // utilizar use dispatch y te crea una función
    const dispatch = useDispatch();

    // Acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);

    // mandar llamar el action de productoAction
    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));


    // cuando el usuario haga submit
    const submitNuevoProducto = (e) => {
        e.preventDefault()

        // validar formulario
        if (nombre.trim() === '' || precio <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Todos los Campos son Obligatorios',
                text: 'Intenta de Nuevo',
                confirmButtonText: 'Confirmar'
            })
            return
        }

        // si no hay errores

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        })

        // Redireccionar
        navigate('/')
    }


    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Agregar Nuevo Producto
                        </h2>

                        <form onSubmit={submitNuevoProducto}>
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Nuevo Producto'
                                    name='nombre'
                                    value={nombre}
                                    onChange={e => guardarNombre(e.target.value)}
                                >
                                </input>
                            </div>

                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    placeholder='Precio Producto'
                                    name='precio'
                                    value={precio}
                                    onChange={e => guardarPrecio(+e.target.value)}
                                >
                                </input>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>
                        {cargando ? <Spinner /> : null}
                        {error ? <p className='alert alert-danger p2-2 mt-4 text-center'>Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoProducto;