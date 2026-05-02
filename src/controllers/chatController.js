import Chat from '../models/Chat.js';

// Crear chat
export const createChat = async (req, res, next) => {
  try {
    const { name, participants, type } = req.body;
    const chat = await Chat.create({
      name: name || `Chat ${Date.now()}`,
      participants: [req.user.id, ...participants],
      type,
      createdBy: req.user.id
    });
    
    const populatedChat = await chat.populate('participants', '-password');
    
    res.status(201).json({
      success: true,
      data: populatedChat,
      message: 'Chat creado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

// Listar chats del usuario
export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({ participants: req.user.id })
      .populate('participants', '-password')
      .sort('-lastMessage');
    
    res.status(200).json({
      success: true,
      data: chats,
      message: 'Chats obtenidos exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

// Obtener chat por ID
export const getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('participants', '-password');
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: chat,
      message: 'Chat obtenido exitosamente'
    });
  } catch (error) {
    next(error);
  }
};
