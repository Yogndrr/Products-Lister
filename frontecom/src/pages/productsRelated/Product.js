import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Product.css"

const Product = ({ user }) => {
    const currentUserID = user._id

    const [products, setProducts] = useState([]);

    const [key, setKey] = useState("")

    const getProducts = () => {
        axios.get(`http://localhost:5000/products`)
            .then((result) => {
                setProducts(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:5000/product/${id}`)
            .then(() => {
                getProducts()
                // For more faster approach
                // setProducts(products.filter(product => product._id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const searchHandler = (event) => {
        setKey(event.target.value)
        key === ""
            ?
            getProducts()
            :
            axios.get(`http://localhost:5000/search/${key}`)
                .then((response) => {
                    setProducts(response.data)
                })
                .catch((error) => {
                    console.error(error);
                })
    }

    const clearHandler = () => {
        setKey("")
        getProducts()
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <div className="product-header">
                <div className="product-add">
                    <h1>Product List</h1>
                    <div className="button-container">
                        <Link to="/add" className="button">Add Product</Link>
                    </div>
                </div>
                <div className="product-search">
                    <input type="text" placeholder="Search" value={key} onChange={searchHandler} />
                </div>
            </div>

            {products.length > 0 ?
                <div>
                    {products.filter((product) => product.userId === currentUserID).length > 0
                        ?
                        <div className="product-table">
                            <div className="table-header">
                                <div className="table-cell">S.No</div>
                                <div className="table-cell">Name</div>
                                <div className="table-cell">Price</div>
                                <div className="table-cell">Brand</div>
                                <div className="table-cell">Category</div>
                                <div className="table-cell">Operation</div>
                            </div>
                            {products.filter((product) => product.userId === currentUserID).map((product, index) => (
                                <div className="table-row" key={product._id}>
                                    <div className="table-cell">{index + 1}</div>
                                    <div className="table-cell">{product.name}</div>
                                    <div className="table-cell">{product.price}</div>
                                    <div className="table-cell">{product.brand}</div>
                                    <div className="table-cell">{product.category}</div>
                                    <button onClick={() => { deleteHandler(product._id) }}>Del</button>
                                    <button><Link to={"/update/" + product._id}>Update</Link></button>
                                </div>
                            ))}
                        </div>
                        :
                        <div className="product-header">
                            <h3 className='product-add'>It's Empty Here</h3>
                        </div>
                    }
                </div>
                :
                <div>
                    <div className="product-header">
                        <h3 className='product-add'>No Results Found</h3>
                    </div>
                    <div className="clear-button-container">
                        <button className="clear-button" onClick={clearHandler}>Return Home</button>
                    </div>
                </div>
            }

        </div>
    );
};

export default Product;
