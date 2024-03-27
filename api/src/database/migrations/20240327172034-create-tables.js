"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      idUser: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: "id_user",
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
    await queryInterface.createTable("todos", {
      idTodo: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: "id_todo",
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: { model: "users", key: "id_user" },
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      done: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
    });
    await queryInterface.createTable("tasks", {
      idTask: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: "id_task",
      },
      todoId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        field: "todo_id",
        references: { model: "todos", key: "id_todo" },
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      done: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("todos");
    await queryInterface.dropTable("tasks");
  },
};
