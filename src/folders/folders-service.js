const FoldersService = {
  getAllFolders(knex) {
    return knex.select('*').from('folders');
  },
  getFolderById(knex, id) {
    return knex.select('*').from('folders').where('id', id).first();
  },
  insertFolder(knex, newFolderData) {
    return knex
      .insert(newFolderData)
      .into('folders')
      .returning('*')
      .then((rows) => rows[0]);
  },
  updateFolder(knex, id, newFolderData) {
    return knex('folders')
      .where({ id })
      .update(newFolderData);
  },
  deleteFolder(knex, id) {
    return knex('folders')
      .where({ id })
      .delete();
  },
};

module.exports = FoldersService;
