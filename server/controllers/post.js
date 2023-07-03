import Post from '../module/Posts.js'

//create
export const createPost = async(req, res) => {
    try {
        const { userId, description, picturePath } = req.body
        const user = await User.findOne(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.userPicturePath,
            picturePath,
            likes: {},
            comments: [],
        })
        await newPost.save()
            //重新抓取全部貼文
        const Post = await Post.find()
            //重新抓取全部貼文
        res.status(201).json(post)

    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const getFeedPosts = async(req, res) => {
    try {
        const Post = await Post.find()
        res.status(201).json(post)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const getUserPosts = async(req, res) => {
    try {
        const { userId } = req.params
        const post = await Post.find({ userId })
        res.status(201).json(post)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}


export const likePosts = async(req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)
        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }
        const updatedPost = await Post.findByIdAndUpdate(id, {
            likes: post.likes
        }, {
            new: true
        })

        res.status(201).json()
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}