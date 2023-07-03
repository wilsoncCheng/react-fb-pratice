import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
import User from '../module/User.js'

export const register = async(req, res) => {
    try {
        const {
            firstNmae,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions
        } = req.body
            //密碼加密
        const salt = await bcrypt.genSalt()
        const passwordHasg = await bcrypt.hash(password, salt)
            //密碼加密

        const newUser = new User({
            firstNmae,
            lastName,
            email,
            password: passwordHasg,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })
        const saveUser = await newUser.save()
        res.status(201).json(saveUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: 'User Does Not Exist' })

        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) return res.status(400).json({ msg: 'Invalid credentils.' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({ token, user })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}