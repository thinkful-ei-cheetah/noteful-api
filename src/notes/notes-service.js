'use strict';

const NotesService = {
  list(knex) {
    return knex('notes').select('*');
  },

  findById(knex, id) {
    return knex('notes').where({id}).first('*');
  },

  insert(knex, folder) {
    return knex('notes')
      .insert(folder)
      .returning('*')
      .then(rows => rows[0]);
  }
};

module.exports = NotesService;