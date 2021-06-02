const { Schema, model } = require('mongoose');

const { match } = require('node:assert');
// const {
//     isEmail,
//   } = require('validator');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'You must put something here!',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: 'You must put something here!',
            validate: {
                validator: match // come back to this
            }
        },
        thoughts: {
            // not sure for this one
        },
        friends: {
            // not sure for this one
        }
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;

});

const User = model('User', UserSchema);

module.exports = User;

