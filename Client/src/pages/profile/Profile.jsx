import React, { useEffect, useState } from 'react'
import { GetStudentCourses } from '../../services/api'
import { useParams } from 'react-router-dom'
import './profile.scss'

const Profile = () => {
    let { userId } = useParams();
    const [results, setResults] = useState([]);
    useEffect(() => {
        if (userId) {
            GetStudentCourses(userId)
                .then(response => response.json())
                .then(data => {
                    if (data.data) {
                        setResults(data.data)
                    } else {
                        alert(`${data.message}`)
                    }
                }
                )
        } else {
            alert("Please login again.")
        }
    }, [])

    return (
        <div className='profile-container'>

            <div className="header-container">

                <h1 className="username">

                    Student name: <span className='username-container'>{results[0]?.StudentName}</span>
                </h1>
                <h2 className="student-id">ID: <span className='id-container'>ITITIU{results[0]?.StudentID}</span></h2>
            </div>
            <div className="courses-registered">
                <h1 className="courses-registered__title">Student's courses</h1>
                {results.map(result => <h3 key={result._ID} className='course-name' >- {result?.CourseName}<span>  - Credits: {result?.Credits}</span></h3>)}
            </div>
        </div>
    )
}

export default Profile