import User from "../models/User.js"

export const getUser= async(req, res)=>{
    try {
        const {id}=req.params;
        let user=await User.findById(id)
        if(!user){
            return res.status(404).json("no such user found")
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const getUserFriends= async(req, res)=>{
    try {
        const {id}=req.params;
        let user=await User.findById(id)
        if(!user){
            return res.status(404).json("no such user found")
        }

        const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )

        const fromattedFriends= friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath})=>{
                return {_id,firstName,lastName,occupation,location,picturePath};
            }
        )
        res.status(200).json(fromattedFriends);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const addRemovefriends= async(req, res)=>{
    try {
        const {id,friendId}=req.params;
        
        let user=await User.findById(id)
        let friend=await User.findById(friendId)
        if(!user || !friend){
            return res.status(404).json("no such user found")
        }
        if(user.friends.includes(friendId)){
            user.friends=user.friends.filter((id)=>{id!==friendId})
            friend.friends=friend.friends.filter((id)=>{id!==id})
        }else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();
        
    
        const friends= await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )

        const fromattedFriends= friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath})=>{
                return {_id,firstName,lastName,occupation,location,picturePath};
            }
        )
        res.status(200).json(fromattedFriends);

    } catch (error) {
        res.status(501).json({error:error.message})
    }
}

