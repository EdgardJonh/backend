const express = require('express');
const { sequelize, Sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoutes);

// Inicializa los modelos
Object.values(sequelize.models).forEach(model => {
  if (typeof model.init === 'function') {
    model.init(sequelize);
  }
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

module.exports = app;
