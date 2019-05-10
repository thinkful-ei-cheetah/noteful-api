'use strict';

const path = require('path');
const express = require('express');
const FoldersService = require('./folders-service');
const foldersRouter = express.Router();
const jsonParser = express.json();
const {sanitizeFields} = require('../utils');

foldersRouter
  .route('/')
  .get(async (req, res, next) => {
    const db = req.app.get('db');
    try {
      const folders = await FoldersService.list(db);
      res.json(folders);
    } catch(err) {
      next(err);
    } 
  })
  .post(jsonParser, async (req, res, next) => {
    const db = req.app.get('db');
    const { name } = req.body;

    if (!name) {
      return next({status: 400, message: '"name" field is required'});
    }

    const newFolder = sanitizeFields({name});
    try {
      const folder = await FoldersService.insert(db, newFolder);
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${folder.id}`))
        .json(folder);
    } catch(err){
      next(err);
    }
  });

foldersRouter
  .route('/:folder_id')
  .all(async (req, res, next) => {
    try {
      const folder = await FoldersService.findById(req.app.get('db'), req.params.folder_id);
      if (!folder) {
        return next({status: 404, message: 'Folder doesn\'t exist'});
      }
      res.folder = folder ;
      next();
    } catch(err) {
      next(err);
    }
  })
  .get((req, res, next) => {
    res.json(res.folder);
  });
  

module.exports = foldersRouter;