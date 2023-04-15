import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import("./UpdateProduct.css")

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');

    const params = useParams()
    const navigate = useNavigate()

    const fields = { name, price, brand, category }

    const getProductDetails = () => {
        axios.get(`http://localhost:5000/product/${params.id}`)
            .then((result) => {
                setName(result.data.name)
                setPrice(result.data.price)
                setBrand(result.data.brand)
                setCategory(result.data.category)
            })
    }

    const updateHandler = (event) => {
        event.preventDefault()

        axios.put(`http://localhost:5000/product/${params.id}`, fields,
            {
                headers: { "Content-Type": "application/json" }
            }
        )
            .then(() => {
                navigate("/")
            })

            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        getProductDetails()
    }, [])


    const resetHandler = () => {
        setName("")
        setPrice("")
        setBrand("")
        setCategory("")
    }

    return (
        <>
            <form onSubmit={updateHandler}>
                <h1>Update Product Details</h1>
                <div className="product-list-container">
                    <Link to="/" className="product-list">Product List</Link>
                </div>
                <br />
                <div className="update-product-form">
                    <div className="form-field">
                        <span>Name:</span>
                        <input
                            type="text" name="name" placeholder="Update product's name" className="input-field"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required
                        />
                    </div>

                    <div className="form-field">
                        <span>Price:</span>
                        <input
                            type="text" name="price" placeholder="Update product's price" className="input-field"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <span>Brand:</span>
                        <input
                            type="text" name="brand" placeholder="Update product's brand" className="input-field"
                            value={brand}
                            onChange={(event) => setBrand(event.target.value)}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <span>Category:</span>
                        <input
                            type="text" name="category" placeholder="Update product's category" className="input-field"
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" id='update-product'>Update</button>
                    <br />
                    <button id='reset' onClick={resetHandler}>Reset</button>
                </div>
            </form>
        </>
    )
}

export default UpdateProduct