exports.seed = function(knex) {
    return knex('extra').del()
    .then(function () {
      return knex('extra').insert([
          {
            retrieval_date:"2022/11/06",
            user_email:"figo1234@yahoo.co.jp",
            declared_content_one:"Barbecue set",
            declared_content_two:"",
            declared_content_three:"",
          }
      ]);
    });
  };
