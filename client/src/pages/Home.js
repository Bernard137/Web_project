import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    const [todoList, setTodoList] = useState([])
    const userId = sessionStorage.getItem('userId')

    const priorityRead = (priority) => {
        switch (priority) {
            case "1":
                return "Low"
            case "2":
                return "Medium"
            case "3":
                return "High"
            default:
                return "Low"
        }
    }

    const getTodoList = () => {
        if (userId) {
            axios.get('http://localhost:3001/items/all/' + userId).then(res => {
                setTodoList(res.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/items/' + id).then(res => {
            getTodoList()
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getTodoList()
    }, [])

    return (
        <div>
            <Header />
            <div className="homepage">
                <h1>Todo List</h1>
                <div className="listDesc">
                    <h3>Task</h3>
                    <h3>Priority</h3>
                    <h3>Status</h3>
                    <h3>Edit</h3>
                    <h3>Delete</h3>
                </div>
                {todoList.some(todo => !todo.complete) && <h4>In progress</h4>}
                {todoList.map((item, index) => {
                    return (
                        item.complete === false && <div className='listItem' key={index}>
                            <h3>{item.text}</h3>
                            <p className={item.priority === "1" ? "low" : item.priority === "2" ? "medium" : "high"}>{priorityRead(item.priority)}</p>
                            <p>{item.complete === true ? "Done" : "In progress"}</p>
                            <Link to={'/edit/' + item.id}><FontAwesomeIcon icon={faPen} style={{ color: "#0193d6", }} /></Link>
                            <p onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} style={{ color: "#d41515c0", }} /></p>
                        </div>
                    )
                })}

                {todoList.some(todo => todo.complete) && <h4>Done</h4>}
                {todoList.map((item, index) => {
                    return (
                        item.complete === true && <div className='listItem' key={index}>
                            <h3>{item.text}</h3>
                            <p className={item.priority === "1" ? "low" : item.priority === "2" ? "medium" : "high"}>{priorityRead(item.priority)}</p>
                            <p>{item.complete === true ? "Done" : "In progress"}</p>
                            <Link to={'/edit/' + item.id}><FontAwesomeIcon icon={faPen} style={{ color: "#0193d6", }} /></Link>
                            <p onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} style={{ color: "#d41515c0", }} /></p>
                        </div>
                    )
                })}
                {todoList.length === 0 && <h4 className='noData'>No items</h4>}
            </div>
        </div>
    )
}

export default Home