import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'project',
  modelName: 'Project',
})
export class Project extends Model {
  @Column({
    primaryKey: true,
    type: DataType.BIGINT,
  })
  id?: number;

  @Column(DataType.STRING)
  image?: string;

  @Column(DataType.STRING)
  title?: string;

  @Column(DataType.STRING)
  likes?: string;

  @Column(DataType.INTEGER)
  visits?: number;

  @Column(DataType.STRING)
  description?: string;

  @Column(DataType.STRING)
  technologies?: string;

  @Column(DataType.STRING)
  repository?: string;

  @Column(DataType.STRING)
  linkedin?: string;

  @Column(DataType.STRING)
  userId?: string;
}

export default Project;
