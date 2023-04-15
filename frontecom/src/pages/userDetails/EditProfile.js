import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const EditProfile = ({ user }) => {

    const userID = user._id

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const fields = { name, email, password }

    const getUserDetails = () => {
        axios.get(`http://localhost:5000/user-details/${userID}`)
            .then((result) => {
                setName(result.data.name)
                setEmail(result.data.email)
                setPassword(result.data.password)
            })
    }

    const handleSaveChanges = (event) => {
        event.preventDefault()

        axios.put(`http://localhost:5000/user-details/${userID}`, fields,
            {
                headers: { "Content-Type": "application/json" }
            }
        )
            .then(() => {
                navigate('/updatelogout');
            })
    }

    const resetHandler = () => {
        setName("")
        setEmail("")
        setPassword("")
    }

    useEffect(() => {
        getUserDetails()
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <form onSubmit={handleSaveChanges}>
                <div className="signup-form">
                    <div className="form-field">
                        <span>Name:</span>
                        <input
                            type="text" name="name" placeholder="Change your name" className="input-field"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required
                        />
                    </div>

                    <div className="form-field">
                        <span>Email:</span>
                        <input
                            type="email" name="email" placeholder="Change your email" className="input-field"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email" required
                        />
                    </div>

                    <div className="form-field">
                        <span>Password:</span>
                        <input
                            type="text" name="password" placeholder="Change your password" className="input-field"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="new-password" required
                        />
                    </div>

                    <button type="submit" id='signUp'>Save Changes</button>
                    <br />
                    <button id='reset' onClick={resetHandler}>Reset</button>
                </div>
            </form>
        </>
    );
};

export default EditProfile;
