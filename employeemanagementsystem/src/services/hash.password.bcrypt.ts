
import {compare, genSalt, hash} from 'bcryptjs';

export interface PasswordHasher<T = string> {
  hashPassword(password: T): Promise<T>;
  comparePassword(providedPassword: T, storedPassword: T): Promise<boolean>;
}

export class BcrtyptHasher implements PasswordHasher<string>{
  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    const passwordMatched = await compare(providedPass, storedPass);
    return passwordMatched;
  }



  async hashPassword(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}
