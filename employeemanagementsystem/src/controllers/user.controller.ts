import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getJsonSchemaRef, getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {BcrtyptHasher} from '../services/hash.password.bcrypt';
import {JWTService} from '../services/jwt-service';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../services/keys';
import {MyUserService} from '../services/user-service';
import {CredentialsRequestBody} from './specs/user.controller.spec';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcrtyptHasher,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
  ) {}

  @post('users/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User, {
            title: 'NewUser',
            exclude: ['password']
          }),
        },
      },
    },
  })
  async signup(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {
          title: 'NewUser',
          exclude: ['id'],
        }),
      },

    }
  }) userData: User) {

    userData.password = await this.hasher.hashPassword(userData.password);
    const savedUser = await this.userRepository.create(userData);
    return savedUser;
  }


  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })

  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return Promise.resolve({token});
  }

  // @get('/users/test')
  // @authenticate('jwt')
  // async me(): Promise<UserProfile> {
  //   return Promise.resolve({[securityId]: '1', id: '1', name: 'dummy '});
  // }

  // async login(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(User, {exclude: ['id']}),
  //       },
  //     },
  //   }) user: User,
  // ): Promise<{token: string}> {

  //   return Promise.resolve({token: '47289374928734asdads'});
  // }

}

