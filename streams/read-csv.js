import fs from 'node:fs';
import { parse } from 'csv-parse';

const csvPath = new URL('values.csv', import.meta.url);

async function run() {
  const linesParse = fs.createReadStream(csvPath)
    .pipe(parse({
      delimiter: ",",
      skipEmptyLines: true,
      from_line: 2
    }));

  for await (const line of linesParse) {
    const [title, description] = line;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }
}

run();

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
