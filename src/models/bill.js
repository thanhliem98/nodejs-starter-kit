import {
    sequelize,
    Sequelize
} from './base'

export default sequelize.define(
    'tbl_bill',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        total_price: {
            type: Sequelize.DOUBLE,
        },
        note: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
            validate: {
                isIn: [
                    ['UNPAID', 'PAID', 'CANCEL']
                ]
            }
        },
        customer_id: {
            type: Sequelize.UUID,
            references: {
                model: 'tbl_customer',
                key: 'id'
            }
        },
        employee_id: {
            type: Sequelize.UUID,
            references: {
                model: 'tbl_employee',
                key: 'id'
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
