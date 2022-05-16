import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import conn from '../connectDB'
import user from './model_user'
import soal from './model_soal'

interface JawabanModel extends Model<InferAttributes<JawabanModel>, InferCreationAttributes<JawabanModel>> {
    id_jwbn: CreationOptional<number>;
    id_soal:number;
    id_user:number;
    jawaban: string;
    nilai:string;
    created_by:string;
    updated_by:string;
    
}

const JawabanModel = conn.define<JawabanModel>(
    'jawaban_users',{
        id_jwbn:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        id_soal:{
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'mst_soals'
                },
                key: 'id_soal'
            }
        },
        id_user:{
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'mst_users'
                },
                key: 'id_user'
            }
        },
        jawaban:{
            allowNull: true,
            type: DataTypes.STRING(10)
        },
        nilai:{
            allowNull: true,
            type: DataTypes.STRING(10)
        },
        created_by:{
            allowNull: false,
            type: DataTypes.STRING(500)
        },
        updated_by:{
            allowNull: false,
            type: DataTypes.STRING(500)
        }
    }
);

user.hasMany(JawabanModel,{
    sourceKey: 'id_user',
    foreignKey: 'id_user',
    as: 'userJwbn'
})
JawabanModel.belongsTo(user,{
    targetKey:'id_user',
    foreignKey:'id_user',
    as: 'jwbnUser'
})

soal.hasOne(JawabanModel,{
    sourceKey: 'id_soal',
    foreignKey: 'id_soal',
    as: 'soalJwbn'
})
JawabanModel.belongsTo(soal,{
    targetKey:'id_soal',
    foreignKey:'id_soal',
    as: 'jwbnSoal'
})

export default JawabanModel;