const NotesService = {
  getAllNotes(knex) {
    return knex.select('*').from('notes');
  },
  getNoteById(knex, id) {
    return knex.select('*').from('notes').where('id', id).first();
  },
  insertNote(knex, newFolderData) {
    return knex
      .insert(newFolderData)
      .into('notes')
      .returning('*')
      .then((rows) => rows[0]);
  },
  updateNote(knex, id, newFolderData) {
    return knex('notes')
      .where({ id })
      .update(newFolderData);
  },
  deleteNote(knex, id) {
    return knex('notes')
      .where({ id })
      .delete();
  },
};

module.exports = NotesService;
