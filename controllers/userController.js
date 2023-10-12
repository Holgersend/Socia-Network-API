const { User } = require('../models');


module.exports = {
 // GET all users 
    async getUsers(req, res){
        try {
            const users = await User.find();

            const userObj = {
                users,
                headCount: await headCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
// GET a single user by its id
    async getSingleUser(req, res) {
        try { 
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No User with that ID'})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
// POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// PUT to update a user by its id 
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId, { $set: req.body }, { runValidator: true, new: true }
            );
            if(!user) {
                return res.status(404).json(err);
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// DELETE to remove user by its id
    async deleteUser(req, res) {
        try { 
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json(err);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};