import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import conn from '../connectDB'
import role from './model_role'

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id_user: CreationOptional<number>;
    nm_user: string;
    username:string;
    password:string;
    role:number;
    access_token:CreationOptional<string> | null;
    refresh_token:CreationOptional<string> | null;
    created_by:string;
    updated_by:string;
    
}

const UserModel = conn.define<UserModel>(
    'mst_users',{
        id_user:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nm_user:{
            allowNull: false,
            type: DataTypes.STRING(500)
        },
        username:{
            allowNull: false,
            type: DataTypes.STRING(50),
            unique: true
        },
        password:{
            allowNull: false,
            type: DataTypes.STRING(500)
        },
        role:{
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'mst_roles'
                },
                key: 'id_role'
            }
        },
        access_token:{
            allowNull: true,
            type: DataTypes.TEXT
        },
        refresh_token:{
            allowNull: true,
            type: DataTypes.TEXT
        },
        created_by:{
            allowNull: false,
            type: DataTypes.STRING(500)
        },
        updated_by:{
            allowNull: false,
            type: DataTypes.STRING(500)
        },
        
    }
);

role.hasMany(UserModel,{
    sourceKey: 'id_role',
    foreignKey: 'role',
    as: 'roleUser'
})
UserModel.belongsTo(role,{
    targetKey:'id_role',
    foreignKey:'role',
    as: 'userRole'
})

export default UserModel;