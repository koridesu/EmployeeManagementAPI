import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Employee
} from '../models';
import {DegreeRepository, DepartmentRepository, EmployeeRepository} from '../repositories';

export class DegreeEmployeeController {
  constructor(
    @repository(DegreeRepository)
    public degreeRepository: DegreeRepository,
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
  ) {}

  @get('/employees/degreelogs/{id}', {
    responses: {
      '200': {
        description: '',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
  ) {

    var employeeInfo = {
      id: 0,
      name: "",
      surname: "",
      email: "",
      phone: 0,
      salary: 0,
      supervisor: "",
    };

    let departmentId;
    var degreelog = await this.degreeRepository.find({where: {employeeId: id}});
    var employee = this.employeeRepository.findById(id);
    await employee.then((res) => {
      employeeInfo.id = res.id;
      employeeInfo.name = res.name;
      employeeInfo.surname = res.surname;
      employeeInfo.email = res.email;
      employeeInfo.phone = res.phone;
      employeeInfo.salary = res.salary;
      employeeInfo.supervisor = res.supervisor;

      departmentId = res.departmentId
    })
    var department = await this.departmentRepository.findById(departmentId);

    var DegreelogInfo = degreelog.map((item) => {
      let temp = {
        department: department.name,
        degree: item.DegreeName,
        startdate: `${item.startdate}`,
        finishdate: `${item.finishdate}`,
      }
      return temp;
    })
    return {
      employeeInfo,
      DegreelogInfo
    };
  }
}
