const { Thought } = require('../models');

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Post.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET to get a single thought by its id 
    async getSingleThought(req, res) {
        try {
            const thought = await Post.findOne({ _id: req.params.postId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // POST to create a new thought
    async createThought(req, res) {
        try {
            const thought = await Post.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Thought created, but found no user with that ID' });
            }

            res.json('Created the thought');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },


    // PUT  to update a thought bt its id
    // DELETE to remove a thought by its id

};