'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class financial_records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'created_by',
        onDelete: 'RESTRICT'
      });
    }
  }
  financial_records.init({
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Income', 'Expense']
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'miscellaneous'
    },
    record_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'financial_records',
  });
  return financial_records;
};