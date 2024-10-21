const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false, // set to console.log to see the raw SQL queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada');
  } catch (err) {
    console.error('Error al sincronizar la base de datos:', err);
  }
};

module.exports = { sequelize, connectDB, syncDB };
