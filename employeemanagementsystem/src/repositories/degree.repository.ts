import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Degree, DegreeRelations, Employee} from '../models';
import {PostgresqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmployeeRepository} from './employee.repository';

export class DegreeRepository extends DefaultCrudRepository<
  Degree,
  typeof Degree.prototype.id,
  DegreeRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof Degree.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Degree, dataSource);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
