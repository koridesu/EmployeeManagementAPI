import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee} from './employee.model';
import {Degree} from './degree.model';

@model()
export class Department extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  managerId?: number;

  @hasMany(() => Employee)
  employees: Employee[];

  @property({
    type: 'number',
  })
  locationId?: number;

  @hasMany(() => Degree)
  degrees: Degree[];

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  // describe navigational properties here
}

export type DepartmentWithRelations = Department & DepartmentRelations;
