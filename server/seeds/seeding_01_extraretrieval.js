exports.seed = function(knex) {
    return knex('extraretrieval').del()
    .then(function () {
      return knex('extraretrieval').insert([
          {
            retrieval_date:"2022/04/11",
            user_email:"figo1234@yahoo.co.jp"
          }
      ]);
    });
  };
