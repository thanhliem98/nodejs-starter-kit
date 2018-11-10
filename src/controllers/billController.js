import {
    sequelize,
    Bill,
    BillItem,
    ScheduleFilm,
    Ticket
} from '../models'
import CrudController from './crudController'
import { errorService } from '../services'


export default class BillController extends CrudController {
    constructor() {
        super(Bill)
    }

    async orderFilm(params) {
        let {
            schedule_film_id,
            tickets,
            customer_id,
            employee_id,
            note
        } = params;

        const transaction = await sequelize.transaction();

        try {
            // handle code
            // check

            let schedule_film = await ScheduleFilm.findOne({
                where: {
                    id: schedule_film_id
                },
                transaction
            });

            // generate data
            let bill = await Bill.create({
                total_price: 0,
                note: note,
                customer_id: customer_id,
                employee_id: employee_id
            }, {
                    transaction
                });

            let total_price = 0;
            for (let i in tickets) {
                let ticket = await Ticket.findOne({
                    where: {
                        id: tickets[i]
                    },
                    transaction
                });
                if (ticket.status != 'EMPTY') throw errorService.error("Vé đã được đặt " +  tickets[i]);

                let bill_item = await BillItem.create({
                    bill_id: bill.id,
                    ticket_id: tickets[i],
                    total_price: schedule_film.price_member
                }, {
                        transaction
                    });

                await Ticket.update({
                    status: 'ORDERED'
                }, {
                        where: {
                            id: tickets[i]
                        },
                        transaction
                    })

                total_price += schedule_film.price_member;
            }

            await bill.update({
                total_price: total_price
            }, {
                    transaction
                });

            transaction.commit();

            return bill;
        }
        catch (e) {
            transaction.rollback();
            throw e;
        }


    }

}