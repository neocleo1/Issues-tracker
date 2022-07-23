import Express from 'express';
import lodash from 'lodash';
import Joi from 'joi';
import * as bcrypt from 'bcrypt';
import User from '../Models/user.js';

//Variables
const authn = Express.Router();
const _ = lodash;

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required(),
    });

    return schema.validate(req);
}

authn.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check if user already in the database
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!validPassword)
        return res.status(400).send('Invalid email or password.');

    //Generate authn token
    const token = user.generateAuthnToken();

    res.send(token);
});

export default authn;
