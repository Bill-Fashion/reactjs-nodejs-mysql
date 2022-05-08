
const LoginReq = (loginBody) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...loginBody })
    };
    return fetch('http://localhost:5000/login', requestOptions);
}
const GetCourses = () => {
    return fetch('http://localhost:5000/courses');
}
const GetStudentCourses = (user_ID) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    
    return fetch(`http://localhost:5000/student/courses?id=${encodeURIComponent(user_ID)}`, requestOptions);
}

const RegisterCourses = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data })
    };
    return fetch('http://localhost:5000/courses', requestOptions);
}
export { LoginReq, GetCourses, RegisterCourses, GetStudentCourses };