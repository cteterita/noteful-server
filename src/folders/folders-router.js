const express = require('express');
const xss = require('xss');
const FoldersService = require('./folders-service');

const foldersRouter = express.Router();
const bodyParser = express.json();

const serializeFolder = (folder) => ({
  id: folder.id,
  name: xss(folder.folder_name),
});

foldersRouter
  .route('/folders')
  .get((req, res) => {
    FoldersService.getAllFolders(req.app.get('db'))
      .then((folders) => res.json(folders.map(serializeFolder)));
  })
  .post(bodyParser, (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).send('Invalid data: missing name');
    FoldersService.insertFolder(req.app.get('db'), { folder_name: name })
      .then((folder) => res.status(201).json(serializeFolder(folder)))
      .catch(next);
  });

module.exports = foldersRouter;
