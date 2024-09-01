import React, { useState } from 'react'
import Header from '../components/Header'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewItem = () => {
    const navigate = useNavigate();
    const [priority, setPriority] = useState("1");


    const onSubmit = (values) => {
        let userId = sessionStorage.getItem('userId')
        if (userId != null) {
            values.UserId = parseInt(userId);
        }
        values.complete = false;
        values.priority = priority;
        axios.post('http://localhost:3001/items', values).then(res => {
            navigate('/')
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <Header />
            <div className="form">
                <h1>Create new todo item</h1>
                <Formik
                    initialValues={{ text: '' }}
                    validationSchema={Yup.object({
                        text: Yup.string()
                            .max(35, 'Must be 35 characters or less')
                            .required('Title is required'),
                    })}
                    onSubmit={onSubmit}
                >
                    <Form className='todoList'>
                        <label className='mainLabel' htmlFor="text">Title</label>
                        <Field name="text" type="text" />
                        <ErrorMessage name="text" component="span" />

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

                        <div className="status"></div>

                        <div className="buttons">
                            <button className='submit' onClick={() => navigate('/')}>Cancel</button>
                            <button className='submit' type="submit">Submit</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default NewItem