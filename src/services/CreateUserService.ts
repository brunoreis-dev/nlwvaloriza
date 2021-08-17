import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorrect');
    }

    const usersAlreadyExists = await usersRepository.findOne({ email });

    if (usersAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
