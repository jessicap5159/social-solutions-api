const { Schema, model, Types } = require('mongoose');
// const { kStringMaxLength } = require('node:buffer');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtValue)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: 'You must put something here!',
        },
       
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtValue => dateFormat(createdAtValue)

        },
        reactions: [ReactionSchema]

    },
    {
        toJSON: {
            getters: true
        }
    }

);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;

});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;


