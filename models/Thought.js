const { Schema, model, Types } = require('mongoose');
const { kStringMaxLength } = require('node:buffer');
const dateFormat = require('../utils/dateFormat');

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
        reactions: {
            // come back to this
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

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;

});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;


