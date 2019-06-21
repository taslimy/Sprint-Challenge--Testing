exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", tbl => {
    tbl.increments();

    tbl
      .string("title", 150)
      .notNullable()
      .unique();
    tbl.string("genre", 150).notNullable();
    tbl.integer("releaseYear");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};

// structure
// {
//   title: 'Pacman', // required
//   genre: 'Arcade', // required
//   releaseYear: 1980 // not required
// }