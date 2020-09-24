import {HttpErrors} from '@loopback/rest';
import {Credentials} from '../repositories/user.repository';

export function validateCredentials(credentials: Credentials) {

  if (credentials.password.length < 4) {
    throw new HttpErrors.UnprocessableEntity(
      'password should be greater than 4 charahcters',
    );
  }
}
