'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
      }
    }, {
      sequelize,
      modelName: 'User',
    });

    this.beforeCreate(async (user) => {
      user.password = await bcrypt.hash(user.password, 12);
    });

    return this;
  }

  static associate(models) {
    // define association here
  }
}

module.exports = User;
