import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import Joi from 'joi';

const { Schema } = mongoose;
const jwt = jsonwebtoken;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 255,
            //TODO: unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024,
        },
        isAdmin: Boolean,
    },
    { timestamps: true }
);

//Add Generate authentication token method to the user model
userSchema.methods.generateAuthnToken = function () {
    const jwtPrivateKey = process.env.jwtPrivateKey;

    if (!jwtPrivateKey) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined');
        return res
            .status(500)
            .send(
                "Oops, something went wrong. I'ts not your fault, please try again later"
            );
    }

    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        jwtPrivateKey
    );

    return token;
};

//User Moddel
const User = mongoose.models.User || mongoose.model('User', userSchema);

//User input validation using Joi
export function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
    });

    return schema.validate(user);
}

export default User;
