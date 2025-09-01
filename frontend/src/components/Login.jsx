import React, {useState} from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
function Login() {
    const navigate = useNavigate();
    const BackendApi = import.meta.env.VITE_BACKEND_URL
    const [formData,setFormData] = useState({
        email:"",
        password:"",
    })

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${BackendApi}/login`,formData);

            const token = res.data.token;
            localStorage.setItem('token',token);

            console.log("login successful",res.data);
            toast.success(res.data.message);
            navigate('/home');
            
        } catch (error) {
            console.log("error",error);
            toast.error(error.response.data.message);
            
        }
    }

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
  return (
    <>
    <div className="flex items-center justify-center p-4 bg-black w-full h-full">
            <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5 p-4 bg-gray-200 text-black w-1/4 h-[500px] itmes-center justify-center rounded-2xl' >
          <h1 className='text-3xl text-center font-bold text-black'>Login</h1>
               
                <label >Email</label> <input type="email" name='email' value={formData.email} onChange={handleChange} className='p-2  border-gray-600 outline-gray-400 border-1'/>
                <label >Password</label> <input type="password" name='password' value={formData.password} onChange={handleChange} className='p-2  border-gray-400 outline-gray-400 border-1'/>
                <button className='border-gray-300 py-2 px-4 rounded-lg text-md hover:cursor-pointer bg-black text-white max-w-[200px] mx-auto'>Submit</button>

            </form>
        </div>
    </>
  )
}

export default Login