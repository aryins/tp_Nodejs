import User from '../models/User.js';
import jwt from 'jsonwebtoken';


const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

// Crear usuario (registro)
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'El usuario o email ya existe'
      });
    }
    
    const user = await User.create({ username, email, password });
    
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      },
      message: 'Usuario creado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

// Listar usuarios
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      data: users,
      message: 'Usuarios obtenidos exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar usuario
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    res.status(200).json({
      success: true,
      data: null,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

// Login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
      },
      message: 'Login exitoso'
    });
  } catch (error) {
    next(error);
  }
};
