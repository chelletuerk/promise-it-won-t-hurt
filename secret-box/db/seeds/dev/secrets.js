exports.seed = function(knex, Promise) {
  return knex('secrets').del()
  .then(() => {
    return Promise.all([
      knex('secrets').insert({
        id: "HkrRLh2Ge",
        message: "I hate mash potatoes",
        owner_id: 1,
        created_at: new Date
      }),
      knex('secrets').insert({
        id: "asdfjkl",
        message: "I love rap music",
        owner_id: 1,
        created_at: new Date
      }),
      knex('secrets').insert({
        id: "qWeRtY",
        message: "I hate game shows",
        owner_id: 2,
        created_at: new Date
      })
    ]);
  });
};
