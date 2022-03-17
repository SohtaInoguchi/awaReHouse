exports.seed = function(knex) {
    return knex('users').del()
    .then(function () {
      return knex('users').insert([
          {
        first_name: "Satoshi",
        last_name: "Kinokawa",
        password: "$2b$10$koL29inCl5SMITzR23R7IO3bwF.ltWTkIl1UBL96QksJ7zWt0pDA.",
        adress:"Shiny Plaza, Ikebukuro 2-4-Chome, Toshima-ku, Tokyo, 171-0014",
        email:"figo1234@yahoo.co.jp",
        subscription_plan:""
          },
          {
            first_name: "Kaori",
            last_name: "Mizumi",
            password: "$2b$10$L5CZYUdIwmH8uFNzwbXoAO7khHPc8kl4/0nHxu8.6l/xukbRCpniK",
            adress:"Kubo Building, Nagasaki, 1-10-14, Toshima-ku, Tokyo, 171-0051",
            email:"k13.Mizuumi@gmail.com",
            subscription_plan:""
              },
              {
                first_name: "Kentaro",
                last_name: "Nagoshi",
                password: "$2b$10$ItlEu8sVKb6DmOTeYLWYqek3O0duPKNNiK1F.yLbgqScjv4.2ohd2",
                adress:"2-6-11, Nakanoshima, Kita-ku, Osaka-shi, Osaka-fu, 530-8201",
                email:"k.nagoshi976@ezweb.ne.jp",
                subscription_plan:""
                  },
                  {
                    first_name: "Toshio",
                    last_name: "Urabe",
                    password: "$2b$10$wQAfuifryAhe.I8Z2A70IuupeSFpoiPmnqOBs2AUHfyvO7BpsVgbe",
                    adress:"87 Naito-machi, Shinjuku-ku, Tokyo, 160-8484",
                    email:"cakelover012&3@softbank.co.jp",
                    subscription_plan:""
                      },
                      {
                        first_name: "Hiromi",
                        last_name: "Sato",
                        password: "$2b$10$OU8lyoyZnSnYDCG4sVjRHOhwpf50dcoELLDJyxQDJhvKGSCyO0QE6",
                        adress:"1-12-5 Sengen-cho, Nishi-ku, Yokohama, 220-0072",
                        email:"hirochanyakosen@yahoo.co.jp",
                        subscription_plan:""
                          }
      ]);
    });
  };
