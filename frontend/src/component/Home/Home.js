import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/all';
import './Home.css'
import Product from './Product.js';
import MetaData from '../layout/MetaData';
import { clearErrors, getProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert'

const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch();
    const { error, products } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts());
    }, [dispatch, error, alert])

    return (
            <Fragment>
            <MetaData title="Ecommerce" />
            <div className='banner'>
                <p>Welcome to E-Commerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href='#container'>
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className='homeHeading'>Featured Products</h2>
            <div className='container' id="container">
                {products && products.map(product => (
                    <Product key={product._id} product={product} />
                ))}

            </div>
        </Fragment>

    )
}

export default Home