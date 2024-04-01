import {
  Association,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import database from "../database";
import Todo from "./todo";

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User, { omit: "todos" }>
> {
  declare idUser: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<string>;
  declare updatedAt: CreationOptional<string>;

  declare getTodos: HasManyGetAssociationsMixin<Todo>;

  declare todos?: NonAttribute<Array<Todo>>;

  declare static associations: {
    todos: Association<User, Todo>;
  };
}

User.init(
  {
    idUser: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      field: "id_user",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize: database,
    tableName: "users",
  }
);

User.hasMany(Todo, {
  sourceKey: "idUser",
  foreignKey: "userId",
  as: "todos",
});

export default User;
