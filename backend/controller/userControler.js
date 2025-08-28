import User from "../models/user.js";
import connectDb from "../db/db.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const createUser = async (req,res) =>{

try {
    await connectDb()
    const {name,email,password,profileImg} = req.body;
    if(!name || !email || !password){
        
        return res.status(400).json("all fields are required")
    }

    const duplicate = await User.findOne({email})
    if(duplicate){
        return res.status(400).json({message:"email already existing"})
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,email,password:hashPassword,
        profileImg

    })

    await user.save();
    return res.status(200).json({message:"User creted successfully"});
    

} catch (error) {
    console.log(error);
    
    console.log(error.message)
    return res.status(400).json({message:"Error occured"})
    
}

}
export const loginUser = async (req, res) => {
    try {
        await connectDb();
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email or password is missing" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, please signup first" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, profileImg: user.profileImg },
            token
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Server error", error: e.message });
    }
}