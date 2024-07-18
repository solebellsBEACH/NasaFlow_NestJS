import { User } from '@users/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export const userFactory = setSeederFactory(User, async (faker) => {
  const user = new User({
    username: faker.name.fullName(),
    password: faker.internet.password(),
  });
  return user;
});
