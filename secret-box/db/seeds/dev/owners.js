exports.seed = function(knex, Promise) {
  return knex('owners').del()
  .then(() => {
    return Promise.all([
      knex('owners').insert({
        id: 1,
        name: 'Alex Tideman',
        created_at: new Date
      }),
      knex('owners').insert({
        id: 2,
        name: 'Bob Barker',
        created_at: new Date
      })
    ]);
  });
};
