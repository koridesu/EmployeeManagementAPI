import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {BcrtyptHasher} from './hash.password.bcrypt';
import {PasswordHasherBindings} from './keys';


export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcrtyptHasher,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {

    const foundUser = await this.userRepository.findOne({
      where: {
        username: credentials.username,
      },
    });


    if (!foundUser) {
      throw new HttpErrors.NotFound(
        `There is no such a user like this ${credentials.username}`,
      );
    }

    const passwordMatched = await this.hasher.comparePassword(
      credentials.password,
      foundUser.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('password is not valid');
    }
    return foundUser;
  }
  convertToUserProfile(user: User): UserProfile {

    const profile = {
      [securityId]: user.id!.toString(),
      id: user.id,

    }
    return profile;

  }



}
