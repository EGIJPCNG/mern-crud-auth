import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

// export const register = (req,res) => res.send("register");
// export const login = (req,res) => res.send("login");

// req es el request que viene del cliente
// res es la respuesta que se le va a enviar al cliente

export const register = async(req,res) => {
    // console.log(req.body);
    // res.send('registrando');
    const {email, password, username} = req.body;
    try {
        // hacer encriptacion de la contraseña
        const userFound = await User.findOne({email})
        if (userFound) return res.status(400).json(["El correo esta en uso por otro usuario"]);

        const passwordHash = await bcrypt.hash(password, 10);
        // crear un nuevo usuario
        const newUser = new User({
            username,
            email,
            password : passwordHash,
        })
        // guardar el usuario en la base de datos
        const userSaved = await newUser.save();
        // crear el token de acceso
        const token = await createAccessToken({id: userSaved._id});
        res.cookie('token', token)
        res.json({
            _id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })
        
    } catch (error) {
        res.status(500).json({message: 'Error al registrar el usuario'});
    }
};

// export const login = (req,res) => res.send("login");

export const login = async(req,res) => {

    const {email, password} = req.body; // datos requeridos para loguearse
    try {
        const userFound = await User.findOne({email});
        if(!userFound) return res.status(400).json({message: 'Usuario no encontrado'});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch) return res.status(400).json({message: 'Contraseña incorrecta'});   

        // crear el token de acceso
        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token, /*{
            sameSite: 'none',
            secure: true,
            httpOnly: false
        }*/);
        res.json({
            _id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
        
    } catch (error) {
        res.status(500).json({message: 'Error al registrar el usuario'});
    }
};

export const logout = (req,res) => {
    res.cookie('token', "",{
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req,res) => {
    const userFound =  await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({message: 'Usuario no encontrado'});
    return res.json({
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
    
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({ message: "Unauthorized"})

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "Unauthorized" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
}