exports.seed = function (knex) {
  return knex("retrieval")
    .del()
    .then(function () {
      return knex("retrieval").insert([
        {
          retrieval_date: "2022/04/11",
          user_email: "figo1234@yahoo.co.jp",
        },
      ]);
    });
};
