import {Entity, hasMany, model, property} from '@loopback/repository';
import {Department} from './department.model';

@model()
export class Employee extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'number',
  })
  phone: number;

  @property({
    type: 'date',
    required: true,
  })
  startdate: string;

  @property({
    type: 'number',
    required: true,
  })
  salary: number;

  @property({
    type: 'string',
    required: true,
  })
  supervisor: string;

  @property({
    type: 'string',
  })
  degree?: string;

  @hasMany(() => Department, {keyTo: 'managerId'})
  departments: Department[];

  @property({
    type: 'number',
  })
  departmentId?: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
