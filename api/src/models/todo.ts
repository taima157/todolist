import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import User from "./user";
import database from "../database";
import Task from "./task";

class Todo extends Model<
  InferAttributes<Todo>,
  InferCreationAttributes<Todo, { omit: "tasks" }>
> {
  declare idTodo: CreationOptional<string>;
  declare userId: ForeignKey<User["idUser"]>;
  declare title: string;
  declare description: string;
  declare done: CreationOptional<boolean>;

  declare getTasks: HasManyGetAssociationsMixin<Task>;

  declare tasks?: NonAttribute<Array<Task>>;

  declare static associations: {
    tasks: Association<Todo, Task>;
  };
}

Todo.init(
  {
    idTodo: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      field: "id_todo",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "todos",
    createdAt: false,
    updatedAt: false,
  }
);

Todo.hasMany(Task, {
  sourceKey: "idTodo",
  foreignKey: "todoId",
  as: "tasks",
});

export default Todo;
