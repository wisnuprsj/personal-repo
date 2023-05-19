import { Knex, knex } from "knex";

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./data.db",
  },
};

const knexInstance = knex(config);

// interface User {
//     id: number;
//     age: number;
//     name: string;
//     active: boolean;
//     departmentId: number;
//   }
// try {
//     const users = await knex<User>('users').select('id', 'age');
//   } catch (err) {
//     // error handling
//   }
