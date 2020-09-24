import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    constraints: {
      user_username_key:
      {
        name: 'user_username_key',
        entity: 'username',
        entityKey: 'id',
        unique: true
      }
    }
  }
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    id: true
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
