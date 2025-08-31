import React,{useState} from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
function Home() {

    const token = localStorage.getItem('token');
   const BackendApi = import.meta.env.VITE_BACKEND_URL
    const [getWork,setWork] = useState({
        title:"",
        desc:"",
        tags:"",
        date:"",
        
    })
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${BackendApi}/create-todo`,getWork,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(res.data.message);
            console.log(res.data);
            setWork({
                title: "",
                desc: "",
                tags:"",
                date:"",

            })
            
        } catch (error) {
            toast.error(error.response.message);
            console.log(error);
            
        }
    }

    const handleChange = (e)=>{
        setWork({
            ...getWork,
            [e.target.name]: e.target.value,
        })
    }
    const today = new Date().toISOString().split("T")[0];

  return (
    <>
    
   <div className="bg-black min-h-screen flex items-center justify-center p-4">
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white rounded-xl w-[40%] p-6 shadow-lg">
    
    {/* Title */}
    <input
      type="text"
      name="title"
      placeholder="Task Title"
      value={getWork.title}
      onChange={handleChange}
      className="p-3 border border-gray-300 rounded-lg outline-none text-gray-800 placeholder-gray-400"
    />

    {/* Description */}
    <textarea
      name="desc"
      placeholder="Task Description"
      value={getWork.desc}
      onChange={handleChange}
      className="p-3 border border-gray-300 rounded-lg outline-none text-gray-800 placeholder-gray-400 resize-none"
      rows={4}
    />

    {/* Tags */}
    <select
      name="tags"
      value={getWork.tags}
      onChange={handleChange}
      className="p-3 border border-gray-300 rounded-lg outline-none text-gray-800"
    >
      <option value="">Select Tag</option>
      <option value="important">Important</option>
      <option value="urgent">Urgent</option>
      <option value="normal">Normal</option>
    </select>

    {/* Date */}
    
    <input
      type="date"
      min={today}
      name="date"
      value={getWork.date}
      onChange={handleChange}
      className="p-3 border border-gray-300 rounded-lg outline-none text-gray-800"
    />

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-black text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
    >
      Add Task
    </button>
  </form>
</div>


    
    
    
    
    
    </>
  )
}

export default Home