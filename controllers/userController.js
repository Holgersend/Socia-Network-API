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
// PUT to update a user by its id 
// DELETE to remove user by its id
};