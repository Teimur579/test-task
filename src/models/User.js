import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const User = sequelize.define('User', {
    id: { 
        type: DataTypes.INTEGER.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true 
    },
    name: {
        type: DataTypes.STRING(100), 
        allowNull: false 
    },
    birth_date: { 
        type: DataTypes.DATEONLY, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING(100), 
        allowNull: false, 
        unique: true 
    },
    password: { 
        type: DataTypes.STRING(300), 
        allowNull: false 
    },
    role: { 
        type: DataTypes.ENUM('user', 'admin'), 
        defaultValue: 'user' 
    },
    status: { 
        type: DataTypes.ENUM('active', 'inactive'), 
        defaultValue: 'active' 
    },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default User;