import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Employee, EmployeeRelations, Department} from '../models';
import {PostgresqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DepartmentRepository} from './department.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly departments: HasManyRepositoryFactory<Department, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(Employee, dataSource);
    this.departments = this.createHasManyRepositoryFactoryFor('departments', departmentRepositoryGetter,);
    this.registerInclusionResolver('departments', this.departments.inclusionResolver);
  }
}
