import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GetCourses, RegisterCourses } from '../../services/api';
import './home.scss';

const Home = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [registerQuery, setRegisterQuery] = useState({
        studentID: state._ID,
        coursesID: []
    });

    useEffect(() => {
        GetCourses()
            .then(response => response.json())
            .then(data => setCourses(data.data))
    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (!state._ID) {
            alert("Please login again")
            return
        } else {
            RegisterCourses(registerQuery)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.message) {
                        alert(`${result.message}`)
                        navigate(`/profile/${state._ID}`)
                    } else {
                        alert(`${result.error}`);
                    }
                });
        }
    }
    return (
        <div className='home-page'>
            <div className="header-container">
                <h1 className='home-page__title'>Register course <span className='title-username'>{state?.StudentName}</span></h1>
                <button className="profile-btn" onClick={() => navigate(`/profile/${state._ID}`)}>Profile</button>
            </div>
            <form onSubmit={onSubmitHandler}>
                {
                    courses.map(course =>
                        <CourseInput course={course} registerQuery={registerQuery} setRegisterQuery={setRegisterQuery} key={course._ID} />
                    )}
                <div className="btn-container">
                    <button className="register-btn" type='submit' >Register</button>
                </div>
            </form>
        </div>
    )
}

function CourseInput({ course, registerQuery, setRegisterQuery }) {

    const onChangeHandler = (e) => {
        const { value, checked } = e.target;
        const { studentID, coursesID } = registerQuery

        if (checked) {
            setRegisterQuery({
                studentID: studentID,
                coursesID: [...coursesID, value]
            })
        } else {
            setRegisterQuery({
                studentID: studentID,
                coursesID: coursesID.filter((e) => e !== value)
            })
        }
    }
    return (
        <div className="register-container">
            <input className='course-check-box' id={course._ID} type="checkbox" value={course._ID} onChange={onChangeHandler} />
            <label className='course-label' htmlFor={course._ID}>{course.CourseName}</label>
        </div>
    )
}

export default Home