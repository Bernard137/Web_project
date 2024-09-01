import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const EditItem = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [item, setItem] = useState(null)
    const [priority, setPriority] = useState("1");
    const [error, setError] = useState('')

    const onSubmit = (values) => {
        values.priority = priority;
        axios.put('http://localhost:3001/items/' + values.id, values).then(res => {
            console.log(res.data)
            navigate('/')
        }).catch(err => {
            console.log(err)
        })
    }

    const getTodoItem = () => {
        axios.get('http://localhost:3001/items/' + id).then(res => {
            setPriority(res.data.priority)
            setItem(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getTodoItem();
    }, [])
    return (
        <>
            <Header />
            <div className="form">
                <h1>Edit Todo Item</h1>
                <Formik
                    initialValues={item ? item : { text: '' }}
                    validationSchema={Yup.object({
                        text: Yup.string()
                            .max(35, 'Must be 35 characters or less')
                            .required('Title is required'),
                    })}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({ values, handleChange, setFieldValue }) => (
                        <Form className='todoList'>
                            <label className='mainLabel' htmlFor="text">Title</label>
                            <input name="text" type="text" value={values.text} onChange={(e) => handleChange(e)} />
                            <div className="valError">
                                <ErrorMessage name="text" component="span" />
                            </div>

                            <div className="priority">
                                <label className='mainLabel' htmlFor='priority'>Priority</label>
                                <div className="radioEl">
                                    <input type="radio" id="low" name="priority" checked={priority === "1"} onClick={() => setPriority("1")} />
                                    <label htmlFor="low">Low</label>
                                </div>
                                <div className="radioEl">
                                    <input type="radio" id="medium" name="priority" checked={priority === "2"} onClick={() => setPriority("2")} />
                                    <label htmlFor="medium">Medium</label>
                                </div>
                                <div className="radioEl">
                                    <input type="radio" id="high" name="priority" checked={priority === "3"} onClick={() => setPriority("3")} />
                                    <label htmlFor="high">High</label>
                                </div>
                            </div>

                            <div className="status">
                                <label className='mainLabel' htmlFor='status'>Status</label>
                                <div className="radioEl">
                                    <input type="radio" id="complete" name="complete" checked={values.complete} onChange={() => setFieldValue("complete", true)} />
                                    <label htmlFor="complete">Complete</label>
                                </div>
                                <div className="radioEl">
                                    <input type="radio" id="incomplete" name="complete" checked={!values.complete} onChange={() => setFieldValue("complete", false)} />
                                    <label htmlFor="incomplete">Incomplete</label>
                                </div>
                            </div>

                            <div className="buttons">
                                <button className='submit' onClick={() => navigate('/')}>Cancel</button>
                                <button className='submit' type="submit">Save</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default EditItem