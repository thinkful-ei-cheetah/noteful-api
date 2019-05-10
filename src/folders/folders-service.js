'use strict';

const FoldersService = {
  list(knex) {
    return knex('folders').select('*');
  },

  findById(knex, id) {
    return knex('folders').where({id}).first('*');
  },

  insert(knex, folder) {
    return knex('folders')
      .insert(folder)
      .returning('*')
      .then(rows => rows[0]);
  }
};

module.exports = FoldersService;