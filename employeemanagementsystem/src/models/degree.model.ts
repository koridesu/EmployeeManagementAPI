import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Employee} from './employee.model';

@model()
export class Degree extends Entity {
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
  DegreeName: string;

  @property({
    type: 'string',
    required: true,
  })
  department: string;

  @property({
    type: 'date',
    required: true,
  })
  startdate: string;

  @property({
    type: 'date',
  })
  finishdate?: string;

  @belongsTo(() => Employee)
  employeeId: number;

  @property({
    type: 'number',
  })
  departmentId?: number;

  constructor(data?: Partial<Degree>) {
    super(data);
  }
}

export interface DegreeRelations {
  // describe navigational properties here
}

export type DegreeWithRelations = Degree & DegreeRelations;
