const User = require("../models/User.model")
const mongoose = require("mongoose")

exports.editUserCtrl = async(req,res,next)=>{
    try {
        const {_id} = req.payload
        
        const {password,email,status,role ,...restUser } = req.body
        const { username,image_url} = await User.findByIdAndUpdate(_id,restUser,{new:true})

        res.status(200).json({username,image_url})
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
        }
        if (error.code === 11000) {
            return res.status(400).json({
            messageError: "El correo electronico ya esta en uso",
            });
        }
        return res.status(500).json({ messageError: error.message });
        }
}

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  };
  
  // Obtener un usuario por su ID
  exports.getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: "ID de usuario inválido" });
      }
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  };

// Obtener el ID del usuario actual
exports.getCurrentUserId = async (req, res) => {
    try {
      const { userId } = req;
      res.status(200).json({ userId });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el ID del usuario" });
    }
  };
  