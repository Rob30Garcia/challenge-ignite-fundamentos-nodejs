import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = search !== undefined ? database.select('tasks', {
        title: search,
        description: search
      }) : database.select('tasks');


      return res.writeHead(200).end(JSON.stringify(tasks));
    }
  }, 
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(404)
          .end(JSON.stringify({
            message: 'title and description are required'
          }))
      }

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
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'), 
    handler: (req, res) => {
      const { id } = req.params;
      const data = req.body;

      if (!data) {
        return res.writeHead(404)
          .end(JSON.stringify({
            message: 'title or description are required'
          }))
      }

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({
          message: "Task not found."
        }));
      }

      database.update('tasks', id, {
        ...data,
        updated_at: new Date().toString(),
      });

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'), 
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({
          message: "Task not found."
        }));
      }

      const isCompletedTask = task.completed_at === null ? 
        new Date().toString() : task.completed_at;

      database.update('tasks', id, {
        updated_at: new Date().toString(),
        completed_at: isCompletedTask
      });

      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'), 
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({
          message: "Task not found."
        }));
      }

      database.delete('tasks', id);

      return res.writeHead(204).end();
    }
  }
];
