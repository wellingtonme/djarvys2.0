import knex from '../connection.js';
import bookshelf from 'bookshelf';

const ORM = bookshelf(knex);

ORM.plugin('registry');

export default ORM;
