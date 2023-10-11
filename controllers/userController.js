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
// POST a new user
// PUT to update a user by its id 
// DELETE to remove user by its id
};