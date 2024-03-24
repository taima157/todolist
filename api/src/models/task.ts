import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import Todo from "./todo";
import database from "../database";

class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
  declare idTask: CreationOptional<string>;
  declare todoId: ForeignKey<Todo["idTodo"]>;
  declare description: string;
  declare done: boolean;
}

Task.init(
  {
    idTask: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      field: "id_task",
    },
    todoId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "todo_id",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize: database,
    tableName: "tasks",
    createdAt: false,
    updatedAt: false,
  }
);

export default Task;
