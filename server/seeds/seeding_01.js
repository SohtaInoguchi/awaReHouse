exports.seed = function(knex) {
    return knex('users').del()
    .then(function () {
      return knex('users').insert([
          {
        first_name: "Satoshi",
        last_name: "Kinokawa",
        password: "figo1234AB",
        adress:"Shiny Plaza, Ikebukuro 2-4-Chome, Toshima-ku, Tokyo, 171-0014"
          },
          {
            first_name: "Kaori",
            last_name: "Mizumi",
            password: "ichiGO111",
            adress:"Kubo Building, Nagasaki, 1-10-14, Toshima-ku, Tokyo, 171-0051"
              },
              {
                first_name: "Kentaro",
                last_name: "Nagoshi",
                password: "kentana113",
                adress:"2-6-11, Nakanoshima, Kita-ku, Osaka-shi, Osaka-fu, 530-8201"
                  },
                  {
                    first_name: "Toshio",
                    last_name: "Urabe",
                    password: "kimOnO4hl&2",
                    adress:"87 Naito-machi, Shinjuku-ku, Tokyo, 160-8484"
                      },
                      {
                        first_name: "Hiromi",
                        last_name: "Sato",
                        password: "SatoHiro2307",
                        adress:"1-12-5 Sengen-cho, Nishi-ku, Yokohama, 220-0072"
                          }
      ]);
    });
  };
