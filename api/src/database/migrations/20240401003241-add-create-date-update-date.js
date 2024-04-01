"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("todos", "created_at", {
      type: Sequelize.DataTypes.DATE,
    });
    await queryInterface.addColumn("todos", "updated_at", {
      type: Sequelize.DataTypes.DATE,
    });
    await queryInterface.addColumn("tasks", "created_at", {
      type: Sequelize.DataTypes.DATE,
    });
    await queryInterface.addColumn("tasks", "updated_at", {
      type: Sequelize.DataTypes.DATE,
    });
    await queryInterface.addColumn("users", "created_at", {
      type: Sequelize.DataTypes.DATE,
    });
    await queryInterface.addColumn("users", "updated_at", {
      type: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("todos", "created_at");
    await queryInterface.removeColumn("todos", "updated_at");
    await queryInterface.removeColumn("tasks", "created_at");
    await queryInterface.removeColumn("tasks", "updated_at");
    await queryInterface.removeColumn("users", "created_at");
    await queryInterface.removeColumn("users", "updated_at");
  },
};
