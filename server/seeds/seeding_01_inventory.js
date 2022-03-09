exports.seed = function(knex) {
    return knex('inventory').del()
    .then(function () {
      return knex('inventory').insert([
          {
            declared_content_one:"snowboard",
            declared_content_two:"",
            declared_content_three:"",
            storage_location:"Ho Hinomikomachi, Hakusan, Ishikawa, 920-2153",
            weight_in_kg:5.23,
            declared_as_fragile:true,
            expected_retrieval_season:"autumn",
            user_owner:"hirochanyakosen@yahoo.co.jp",
            fragile:false,
            heavy:false
          },
          {
            declared_content_one:"Beach volley ball",
            declared_content_two:"Beach goods",
            declared_content_three:"Snorkeling equipment",
            storage_location:"Higashichikuma District, Omi, Hi, Nagano, 399-7702",
            weight_in_kg:17.11,
            declared_as_fragile:false,
            expected_retrieval_season:"spring",
            user_owner:"cakelover012&3@softbank.co.jp",
            fragile:false,
            heavy:true
          },
          {
            declared_content_one:"Barbecue set",
            declared_content_two:"",
            declared_content_three:"",
            storage_location:"Minamisatsuma, Kasedahigashihoncho 12-2, Kagoshima, 897-0031",
            weight_in_kg:14.81,
            declared_as_fragile:false,
            expected_retrieval_season:"spring",
            user_owner:"figo1234@yahoo.co.jp",
            fragile:true,
            heavy:true
          },
          {
            declared_content_one:"Diving cylinders",
            declared_content_two:"Diving suit",
            declared_content_three:"Diving mask",
            storage_location:"Shikishimacho 1-14, Nemuro, Hokkaido, 087-0026",
            weight_in_kg:15.73,
            declared_as_fragile:false,
            expected_retrieval_season:"spring",
            user_owner:"k13.Mizuumi@gmail.com",
            fragile:false,
            heavy:true
          },
          {
            declared_content_one:"Diving camera",
            declared_content_two:"",
            declared_content_three:"",
            storage_location:"Shikishimacho 1-14, Nemuro, Hokkaido, 087-0026",
            weight_in_kg:2.47,
            declared_as_fragile:true,
            expected_retrieval_season:"spring",
            user_owner:"k.nagoshi976@ezweb.ne.jp",
            fragile:true,
            heavy:false
          }
      ]);
    });
  };
