import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks');

      return res.writeHead(200).end(JSON.stringify(tasks));
    }
  }, 
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        create_at: new Date().toString(),
        updated_at: new Date().toString(),
        completed_at: null
      };

      database.insert('tasks', task);

      return res.writeHead(201).end();
    }
  }
];
