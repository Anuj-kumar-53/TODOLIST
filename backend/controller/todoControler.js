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

export const editTodo = async (req,res) => {
    try {
        const mainId = req.user.id;
        const {todoId} = req.params;
        const {title,desc,status,tags,date } = req.body;
        if(!todoId){
            return res.status(400).json({message:"todo id is missimg"})
            
        }
        
        const todo = await Todo.findOne({_id: todoId, userId: mainId});
        if(!todo){
            return res.status(400).json({message:"id mismatch or unauthorized"})
            
        }
        
        if(title !== undefined) todo.title = title
        if(desc !== undefined) todo.desc = desc
        if(date !== undefined) todo.date = date
        if(tags !== undefined) todo.tags =tags
        if(status !== undefined) todo.status = status
        
        await todo.save();
        
        return res.status(200).json({message:"todo updated successfully",todo});

    } catch (error) {
        
    }
}


export const deleteTodo = async (req,res) => {
    try {
        const mainId = req.user.id;
        const {todoId} = req.params;
        if(!todoId){
            return res.status(400).json({message:"todo id is missimg"})
            
        }
        
        const todo = await Todo.findOneAndDelete({_id: todoId, userId: mainId});
        if(!todo){
            return res.status(400).json({message:"id mismatch or unauthorized"})
            
        }
    
        
        return res.status(200).json({message:"todo deleted successfully",todo});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"todo deleted unsuccessfully",todo});
        
    }
}


export const deleteAllTodo = async (req,res) => {
    try {
        const mainId = req.user.id;
        if(!mainId){
            return res.status(400).json({message:"unauthorized"})
            
        }
        
        const todo = await Todo.deleteMany({userId: mainId});
        if(!todo){
            return res.status(400).json({message:"id mismatch or unauthorized"})
            
        }
    
        
        return res.status(200).json({message:"all todo deleted successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"todo deleted unsuccessfully"});
        
    }
}
export const getAllTodo = async (req,res) => {
    try {
        const mainId = req.user.id;
        if(!mainId){
            return res.status(400).json({message:"unauthorized"})
            
        }
        
        const todo = await Todo.find({userId: mainId}).sort({createdAt: -1});
        if(!todo){
            return res.status(400).json({message:"id mismatch or unauthorized"})
            
        }
    
        
        return res.status(200).json({message:"all todo fetched successfully", todo});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"todo fetched unsuccessfully"});
        
    }
}

