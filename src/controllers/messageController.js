import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

// Enviar mensaje
export const sendMessage = async (req, res, next) => {
  try {
    const { chatId, content } = req.body;
    
    // Verificar que el usuario pertenece al chat
    const chat = await Chat.findById(chatId);
    if (!chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes acceso a este chat'
      });
    }
    
    const message = await Message.create({
      chatId,
      userId: req.user.id,
      content
    });
    
    // Actualizar lastMessage del chat
    chat.lastMessage = Date.now();
    await chat.save();
    
    const populatedMessage = await message.populate('userId', '-password');
    
    res.status(201).json({
      success: true,
      data: populatedMessage,
      message: 'Mensaje enviado exitosamente'
    });
  } catch (error) {
    next(error);
  }
};

// Obtener historial de mensajes de un chat
export const getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    // Verificar acceso al chat
    const chat = await Chat.findById(chatId);
    if (!chat || !chat.participants.includes(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'No tienes acceso a este chat'
      });
    }
    
    const messages = await Message.find({ chatId })
      .populate('userId', '-password')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Message.countDocuments({ chatId });
    
    res.status(200).json({
      success: true,
      data: {
        messages,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalMessages: total
      },
      message: 'Historial obtenido exitosamente'
    });
  } catch (error) {
    next(error);
  }
};
