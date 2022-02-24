import React, { Fragment, useEffect, useState } from 'react'
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct, clearErrors } from '../../actions/productAction';
import Product from '../Home/Product';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData';

const categories = [
    "Laptop",
    "TV",
    "Mobile",
    "Watch",
    "Smartwatch"
]

const Products = () => {
    const alert = useAlert()
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);

    const dispatch = useDispatch();

    const { products, productCount, resultPerPage, error } = useSelector(state => state.products);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceChange = (event, newPrice) => {
        setPrice(newPrice);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(currentPage, price, category, ratings));
    }, [dispatch, currentPage, price, category, ratings, alert, error]);

    return (
        <Fragment>
            <MetaData title="PRODUCTS - ECOMMERCE" />
            <h2 className='productHeading'>Products</h2>
            <div className='products'>
                {products && products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>

            <div className='filterBox'>
                <Typography>Price</Typography>
                <Slider
                    value={price}
                    onChange={priceChange}
                    valueLabelDisplay="auto"
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                />

                <Typography>Categories</Typography>
                <ul className='categoryBox'>
                    {categories.map((category) => (
                        <li
                            className='category-link'
                            key={category}
                            onClick={() => setCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                            setRatings(newRating);
                        }}
                        aria-labelledby="continuos-slider"
                        valueLabelDisplay='auto'
                        min={0}
                        max={5}
                    >

                    </Slider>
                </fieldset>

            </div>

            {resultPerPage < productCount && (
                <div className='paginationBox'>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>
            )}

        </Fragment>

    )
}

export default Products