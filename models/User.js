const { Schema, model } = require('mongoose');


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
            validate: {
                validator: function (v) {
                    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            },
            required: "You must provide a valid email",
            unique: true
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;

});

const User = model('User', UserSchema);

module.exports = User;

