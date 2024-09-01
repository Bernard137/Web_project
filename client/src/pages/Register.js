import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null)
    const onSubmit = (values) => {
        axios.post('http://localhost:3001/auth/', values)
            .then(res => {
                console.log(res.data.error)
                if (res.data.error) {
                    setError(res.data.error)
                }
                else {
                    sessionStorage.setItem("auth", "true");
                    sessionStorage.setItem("userId", res.data);
                    navigate('/')
                }
            })
            .catch(err => {
                console.log(err)
                setError(err.response.data.error)
            })
    }

    useEffect(() => {
        sessionStorage.setItem("auth", false);
        sessionStorage.removeItem("userId");
    }, [])

    return (
        <>
            <Header type='login' />
            <div className='form'>
                <h3>Register</h3>
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .min(3, 'Must be 3 characters or more')
                            .max(15, 'Must be 15 characters or less')
                            .required('Username is required'),
                        password: Yup.string()
                            .min(6, 'Must be 6 characters or more')
                            .max(20, 'Must be 20 characters or less')
                            .required('Password is required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values)
                        setSubmitting(false);
                    }}
                >
                    <Form>
                        {error && <span className='error'>{error}</span>}
                        <div className="inputs">
                            <Field name="username" type="text" autoComplete="nope" placeholder="Username" />
                            <div className="valError">
                                <ErrorMessage name="username" component="span" />
                            </div>

                            <Field name="password" type="password" autoComplete="new-password" placeholder="Password" />
                            <div className="valError">
                                <ErrorMessage name="password" component="span" />
                            </div>
                        </div>

                        <p className='info'>Already have an account? <Link to="/login">Log in</Link></p>
                        <button className='submit' type="submit">Register</button>
                    </Form>
                </Formik>

            </div >
        </>
    )
}

export default Register