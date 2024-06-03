'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Zmiana typu kolumny `id` w tabeli `comments` z `STRING` na `INTEGER`
    await queryInterface.changeColumn('comment', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    });
  },

  async down (queryInterface, Sequelize) {
    // W przypadku cofnięcia migracji, zmień kolumnę `id` z powrotem na `STRING`
    await queryInterface.changeColumn('comment', 'id', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    });
  }
};
