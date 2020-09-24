import {authenticate} from '@loopback/authentication';
import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,

  requestBody
} from '@loopback/rest';
import {Degree} from '../models';
import {DegreeRepository} from '../repositories';

export class DegreeController {
  constructor(
    @repository(DegreeRepository)
    public degreeRepository: DegreeRepository,
  ) {}

  @post('/degrees', {
    responses: {
      '200': {
        description: 'Degree model instance',
        content: {'application/json': {schema: getModelSchemaRef(Degree)}},
      },
    },
  }) @authenticate('jwt')
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Degree, {
            title: 'NewDegree',
            exclude: ['id'],
          }),
        },
      },
    })
    degree: Omit<Degree, 'id'>,
  ): Promise<Degree> {
    return this.degreeRepository.create(degree);
  }



  @get('/degrees', {
    responses: {
      '200': {
        description: 'Array of Degree model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Degree, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Degree) filter?: Filter<Degree>,
  ): Promise<Degree[]> {
    return this.degreeRepository.find(filter);
  }


  @get('/degrees/{id}', {
    responses: {
      '200': {
        description: 'Degree model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Degree, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,

  ): Promise<Degree> {
    return this.degreeRepository.findById(id);
  }

  @patch('/degrees/{id}', {
    responses: {
      '204': {
        description: 'Degree PATCH success',
      },
    },
  }) @authenticate('jwt')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Degree, {partial: true}),
        },
      },
    })
    degree: Degree,
  ): Promise<void> {
    await this.degreeRepository.updateById(id, degree);
  }



  @del('/degrees/{id}', {
    responses: {
      '204': {
        description: 'Degree DELETE success',
      },
    },
  }) @authenticate('jwt')
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.degreeRepository.deleteById(id);
  }
}
