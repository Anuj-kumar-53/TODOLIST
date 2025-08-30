import Todo from "../models/todo.js";

export const createTodo = async (req,res) => {
    try {
        const userId =  req.user.id;
        const {title,desc,tags,date,status} = req.body;
        if(!title || !desc || !date){
            return res.status(400).json({message:"field are missing"})
        }


    const newTodo = new Todo({
        title,desc,status,date,tags,userId
    });

   await newTodo.save();
    return res.status(200).json({message: "Data inserted in todo"});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "an error occured in catch",error});
    }
}