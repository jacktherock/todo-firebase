import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../firebase'

function Signup() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password);
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password)
            window.M.toast({ html: `Account created successfully! Please Login!`, classes: "green darken-2" })
            navigate('/login')
        } catch (err) {
            window.M.toast({ html: err.message, classes: "red darken-2" })
            // console.log(err.message)
        }
    }


    return (
        <div className='container center'>
            <h3>Signup</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-field">
                    <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn waves-effect waves-light blue">
                    Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
            <p>Already have account? <Link to="/login"> Login </Link> now</p>
        </div>
    )
}

export default Signup