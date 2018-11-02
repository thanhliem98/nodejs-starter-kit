import {
    sequelize,
    Sequelize
} from './base'

export default sequelize.define(
    'tbl_room',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
          },
          number: {
            type: Sequelize.INTEGER, // viet lai day du INTEGER
          },
          name: {
            type: Sequelize.STRING,
          },
          type: {
            type: Sequelize.STRING,
            validate: {
              isIN: [
                ['2D','3D','BIG_SCREEN','FOUR_WAY_SOUND']
              ]
            }
          },
          created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          },
          updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
          },
          deleted_at: { type: 'TIMESTAMP' }
    },
    {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ['deleted_at'] }
        },
        scopes: {
            deleted: {
                where: { deleted_at: { $ne: null } },
                paranoid: false
            }
        }
    }
)
