import Post from "../models/Post.js"
import User from "../models/User.js"

//CREATE 
export const createPost= async(req,res)=>{
   try {
    const { 
        picturePath,
        userId,
        description ,
    } = req.body;

    const user = await User.findById(userId);
    const newPost = new Post({
        userId,
        firstName:user.firstName,
        lastName:user.lastName,
        picturePath,
        userPicturePath:user.picturePath,
        location:user.location,
        description,
        likes:{},
        comments:[],
    })

    await newPost.save();

    const posts= await Post.find()
    res.status(201).json(posts)
   } catch (error) {
    res.status(409).json({error:error.message})
   }
}


//READ
export const getFeedPost= async(req,res)=>{
   try {
    const posts= await Post.find()
    res.status(201).json(posts)
   } catch (error) {
    res.status(409).json({error:error.message})
   }
}

export const getUserPosts= async(req,res)=>{
   try {
    const {userId} = req.params;
    const posts= await Post.find({userId})
    res.status(201).json(posts)
   } catch (error) {
    res.status(409).json({error:error.message})
   }
}


//UPDATE
export const likePost = async(req,res)=>{
   try {
    const {id} = req.params;
    const {userId} = req.body;
    const post =await Post.findById(id);
    
    const isLiked =post.likes.get(userId);

    if(isLiked){
        post.likes.delete(userId)
    }else{
        post.likes.set(userId,true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
        {_id:id},
        {likes : post.likes},
        {new: true}
    )
 
    res.status(200).json(updatedPost)

   } catch (error) {
    res.status(409).json({error:error.message})
   }
}


