import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Department, DepartmentRelations, Employee, Degree} from '../models';
import {PostgresqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EmployeeRepository} from './employee.repository';
import {DegreeRepository} from './degree.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof Department.prototype.id>;

  public readonly degrees: HasManyRepositoryFactory<Degree, typeof Department.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('DegreeRepository') protected degreeRepositoryGetter: Getter<DegreeRepository>,
  ) {
    super(Department, dataSource);
    this.degrees = this.createHasManyRepositoryFactoryFor('degrees', degreeRepositoryGetter,);
    this.registerInclusionResolver('degrees', this.degrees.inclusionResolver);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
