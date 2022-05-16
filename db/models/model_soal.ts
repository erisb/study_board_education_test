import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import conn from '../connectDB'

interface SoalModel extends Model<InferAttributes<SoalModel>, InferCreationAttributes<SoalModel>> {
    id_soal: CreationOptional<number>;
    detail: string;
    pilihan_jwbn:string;
    kunci_jwbn:string;
    created_by:string;
    updated_by:string;
    
}

const SoalModel = conn.define<SoalModel>(
    'mst_soals',{
        id_soal:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        detail:{
            allowNull: false,
            type: DataTypes.TEXT
        },
        pilihan_jwbn:{
            allowNull: false,
            type: DataTypes.TEXT
        },
        kunci_jwbn:{
            allowNull: false,
            type: DataTypes.STRING(10)
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


export default SoalModel;