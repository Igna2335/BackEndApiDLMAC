const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Ruta para login
 router.post('/login', (req, res) => {

    const { nombreUsuario, passUser } = req.body;
    
  
    // Validamos que se hayan proporcionado el nombre de usuario y la contraseña
    if (!nombreUsuario || !passUser) {
      return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos' });
    }
  
    console.log("Usuario: " + nombreUsuario + " Pass: " + passUser)


    // Consultamos si el usuario existe con la contraseña proporcionada
    const query = 'SELECT * FROM usuarios WHERE nombreUsuario = ? AND passUser = ?';
    db.query(query, [nombreUsuario, passUser], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al verificar las credenciales' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }
  
      // Si las credenciales son correctas, retornamos los datos del usuario
      res.status(200).json({
        message: 'Login exitoso',
        usuario: results[0] // Aquí puedes enviar cualquier detalle del usuario que desees
      });
    });
  });
  
  // Rutas CRUD para la tabla de usuarios
  router.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
      res.status(200).json(results);
    });
  });
  
  router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
      if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json(results[0]);
    });
  });
  
  router.post('/usuarios', (req, res) => {
    const { nombreUsuario, passUser, rol } = req.body;
    const query = 'INSERT INTO usuarios (nombreUsuario, passUser, rol) VALUES (?, ?, ?)';
    db.query(query, [nombreUsuario, passUser, rol], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al crear usuario' });
      res.status(201).json({ message: 'Usuario creado', id: results.insertId });
    });
  });
  
  router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombreUsuario, passUser, rol } = req.body;
    const query = 'UPDATE usuarios SET nombreUsuario = ?, passUser = ?, rol = ? WHERE idUsuario = ?';
    db.query(query, [nombreUsuario, passUser, rol, id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
      res.status(200).json({ message: 'Usuario actualizado' });
    });
  });
  
  router.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE idUsuario = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
      res.status(200).json({ message: 'Usuario eliminado' });
    });
  });
  
  // Rutas CRUD para la tabla de productos
  router.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener productos' });
      res.status(200).json(results);
    });
  });
  
  router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM productos WHERE idProducto = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener el producto' });
      if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
      res.status(200).json(results[0]);
    });
  });
  
  router.post('/productos', (req, res) => {
    const { sku, nombreProducto, existencia, binNum, wareHouse } = req.body;
    const query = 'INSERT INTO productos (sku, nombreProducto, existencia, binNum, wareHouse) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [sku, nombreProducto, existencia, binNum, wareHouse], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al crear producto' });
      res.status(201).json({ message: 'Producto creado', id: results.insertId });
    });
  });
  
  router.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { sku, nombreProducto, existencia, binNum, wareHouse } = req.body;
    const query = 'UPDATE productos SET sku = ?, nombreProducto = ?, existencia = ?, binNum = ?, wareHouse = ? WHERE idProducto = ?';
    db.query(query, [sku, nombreProducto, existencia, binNum, wareHouse, id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar producto' });
      res.status(200).json({ message: 'Producto actualizado' });
    });
  });
  
  router.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM productos WHERE idProducto = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar producto' });
      res.status(200).json({ message: 'Producto eliminado' });
    });
  });
  
  // Rutas CRUD para la tabla de bolsas
  router.get('/bolsas', (req, res) => {
    db.query('SELECT * FROM bolsas', (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener bolsas' });
      res.status(200).json(results);
    });
  });
  
  router.get('/bolsas/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM bolsas WHERE idBolsa = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener la bolsa' });
      if (results.length === 0) return res.status(404).json({ error: 'Bolsa no encontrada' });
      res.status(200).json(results[0]);
    });
  });
  
  router.post('/bolsas', (req, res) => {
    const { sku, cantidadPedida, cantidadSurtida, planeacion, surtidoPor, fechaSurtido } = req.body;

    console.log('<<< llego a bolsa >>>')
    console.log(sku, cantidadPedida, cantidadSurtida, planeacion, surtidoPor, fechaSurtido)
    const query = 'INSERT INTO bolsas (sku, cantidadPedida, cantidadSurtida, planeacion, surtidoPor, fechaSurtido) VALUES (?, ?, ?, ?, ?, date(NOW()))';
    db.query(query, [sku, cantidadPedida, cantidadSurtida, planeacion, surtidoPor, fechaSurtido], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al crear bolsa' });
      res.status(201).json({ message: 'Bolsa creada', id: results.insertId });
    });
  });
  
  router.put('/bolsas/:id', (req, res) => {
    const { id } = req.params;
    const { sku, cantidadPedida, cantidadSurtida, planeacion, surtidoPor, fechaSurtido } = req.body;


    console.log('<<< llego a bolsa  a modificar >>>')
    console.log(sku, cantidadPedida, cantidadSurtida, planeacion, surtidoPor, fechaSurtido)

    const query = 'UPDATE bolsas SET sku = ?, cantidadPedida = ?, cantidadSurtida = ?, planeacion = ?, surtidoPor = ? WHERE idBolsa = ?';
    db.query(query, [sku, cantidadPedida, cantidadSurtida, planeacion, surtidoPor, id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar bolsa' });
      res.status(200).json({ message: 'Bolsa actualizada' });
    });
  });
  
  router.delete('/bolsas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM bolsas WHERE idBolsa = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar bolsa' });
      res.status(200).json({ message: 'Bolsa eliminada' });
    });
  });
  
  // Rutas CRUD para la tabla de cajas
  
// Obtener todas las cajas
router.get('/cajas', (req, res) => {
    db.query('SELECT * FROM cajas', (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener cajas' });
      res.status(200).json(results);
    });
  });

  // Obtener una caja por ID
  router.get('/cajas/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM cajas WHERE idCaja = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al obtener la caja' });
      if (results.length === 0) return res.status(404).json({ error: 'Caja no encontrada' });
      res.status(200).json(results[0]);
    });
  });

  // Crear una caja
  router.post('/cajas', (req, res) => {
    const { idBolsa, secuenciaEmbarque, verificadoPor } = req.body;
    const query = 'INSERT INTO cajas (idBolsa, secuenciaEmbarque, verificadoPor, fechaVerificacion) VALUES (?, ?, ?, NOW())';
    db.query(query, [idBolsa, secuenciaEmbarque, verificadoPor], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al crear caja' });
      res.status(201).json({ message: 'Caja creada', id: results.insertId });
    });
  });

  // Actualizar una caja
  router.put('/cajas/:id', (req, res) => {
    const { id } = req.params;
    const { idBolsa, secuenciaEmbarque, verificadoPor } = req.body;
    const query = 'UPDATE cajas SET idBolsa = ?, secuenciaEmbarque = ?, verificadoPor = ?, fechaVerificacion = NOW() WHERE idCaja = ?';
    db.query(query, [idBolsa, secuenciaEmbarque, verificadoPor, id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar caja' });
      res.status(200).json({ message: 'Caja actualizada' });
    });
  });

  // Eliminar una caja
  router.delete('/cajas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM cajas WHERE idCaja = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar caja' });
      res.status(200).json({ message: 'Caja eliminada' });
    });
  });

  return router;
};
