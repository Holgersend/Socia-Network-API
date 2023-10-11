const { Schema, model } = require('mongoose');

// Thought Schema
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLEngth: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
        virtuals: true,
        getters: true,
        },
    },
);

thoughtSchema.Schema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model ('Thought', thoughtSchema);

module.exports = Thought;