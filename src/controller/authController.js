const { Router } = require('express');
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config')

const User = require('../models/user');

router.post('/registrar', async (req, res, next) => {
    const {username, password, rol} = req.body;
    const user = new User ({
        username,
        password,
        rol
    }); 
    user.password = await user.encriptarPassword(user.password);
    await user.save();

    const token = jwt.sign({id: user._id}, config.secret,{
        expiresIn: 60 * 60 * 24 
    });
    res.json({auth: true, token});
})

router.post('/logeo', async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({username: username});
    if(!user){
        return res.status(404).send("Este usuario no esta registrado");
    }

    const passwordValidado = await user.validarPassword(password);
    if(!passwordValidado){
        return res.status(401).json({auth: false, token: null})
    }
    const token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 60 * 60 * 24 
    });
    res.json({auth: true, token})
})

router.get('/profile', async (req, res, next) =>{

    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No se ha recibido token' 
        });
    }
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findById(decoded.id, {password: 0});
    if(!user){
        return res.status(404).send('El usuario no existe')
    }
    res.json(user);
})

module.exports = router;