import Appointment from '../infra/typeorm/entities/Appointment';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // Transformar uma função em async é faze-la uma Promise
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date }, //date: date
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
