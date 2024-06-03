'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Utwórz nową kolumnę
    await queryInterface.addColumn('comment', 'new_id', {
      type: Sequelize.BIGINT,
      allowNull: false
    });
    
    // 2. Przenieś dane z `id` do `new_id`
    await queryInterface.sequelize.query(`
      UPDATE comment
      SET new_id = id
    `);
    
    // 3. Usuń istniejącą kolumnę `id`
    await queryInterface.removeColumn('comment', 'id');
    
    // 4. Zmień nazwę `new_id` na `id`
    await queryInterface.renameColumn('comment', 'new_id', 'id');
    
    // Ustaw `id` jako klucz główny
    await queryInterface.changeColumn('comment', 'id', {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true
    });
  },

  async down (queryInterface, Sequelize) {

  }
};
