import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
