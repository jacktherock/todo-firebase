import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'

let unsubscribe = () => { }

const Dashboard = ({ user }) => {
    const [text, setText] = useState('')
    const [mytodos, setTodos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            const docRef = db.collection('todos').doc(user.uid)
            unsubscribe = docRef.onSnapshot(docSnap => {
                if (docSnap.exists) {
                    // console.log(docSnap.data().todos);
                    setTodos(docSnap.data().todos);
                } else {
                    alert("NO TODOs")
                    // console.log("NO DOCS")
                }
            })
        } else {
            navigate('/')
        }

        return () => {
            unsubscribe();
        }

    }, [])

    const addTodo = () => {
        db.collection('todos').doc(user.uid).set({
            todos: [...mytodos, text]
        })
    }

    const deleteTodo = (deleteTodo) => {
        const docRef = db.collection('todos').doc(user.uid)
        docRef.get().then(docSnap => {
            const result = docSnap.data().todos.filter(todo => todo !== deleteTodo)
            docRef.update({
                todos: result
            })
        })
    }


    return (
        <div className='container center'>
            <h3>Add Todos</h3>
            <div className="input-field">
                <input type="text" placeholder="Enter todo" onChange={(e) => setText(e.target.value)} />
            </div>
            <button className='btn blue waves-effect waves-light' onClick={() => addTodo()}>Add</button>

            <ul className="collection">
                {mytodos.map(todo => {
                    return <li className="collection-item" key={todo}>{todo}  <i className="material-icons right" onClick={() => {
                        deleteTodo(todo)
                    }}>delete</i></li>
                })}
            </ul>
        </div>
    )
}

export default Dashboard