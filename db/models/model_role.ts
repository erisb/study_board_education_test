import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import conn from '../connectDB'

interface RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
    id_role: CreationOptional<number>;
    kode_role: number;
    nm_role:string;
    created_by:string;
    updated_by:string;
    
}

const RoleModel = conn.define<RoleModel>(
    'mst_roles',{
        id_role:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        kode_role:{
            allowNull: false,
            type: DataTypes.INTEGER,
            unique:true
        },
        nm_role:{
            allowNull: false,
            type: DataTypes.STRING(200)
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

export default RoleModel;