import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProvider';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProvider';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(date: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(date: IFindAllInDayFromProviderDTO): Promise<Appointment[]>
}
