exports.seed = function(knex) {
    return knex('providers').del()
    .then(function () {
      return knex('providers').insert([
          {
            first_name:"Miori",
            last_name:"Suga",
            password:"$2b$10$NmvXqdTHyhAvqk/cFc3cJu0qPGQGHauTRy/1MTNueSYpClkUl2ffS",
            adress:"Higashichikuma District, Omi, Hi, Nagano, 399-7702",
            bank_reference:"Shinsei Bank, 540-6981117",
            emergency_contact_person:"Suga Sohta",
            emergency_contact_phone_number:"026-367-2828",
            email:"mioriatsuga@gmail.com"
          },
          {
            first_name:"Toshio",
            last_name:"Sagawara",
            password:"$2b$10$f1ia9QTSuhmwDTJGhY5WeekwKiKNDQ3cpesHkijBrE5uTpbmPfUJa",
            adress:"3882 Yasuda, Agano, Niigata, 959-2221",
            bank_reference:"SMBC, 211-0227783",
            emergency_contact_person:"Masuda Ryoko",
            emergency_contact_phone_number:"025-262-6969",
            email:"sagachisama66@softbank.co.jp"
          },
          {
            first_name:"Tomoko",
            last_name:"Saito",
            password:"$2b$10$eeIsjwQVWLeN.Stm2lYYAOzCar3yZ2VPM3RK784yxyvFq0umtmiUu",
            adress:"Minamisatsuma, Kasedahigashihoncho 12-2, Kagoshima, 897-0031",
            bank_reference:"SMBC, 211-4505051",
            emergency_contact_person:"Saito Kenji",
            emergency_contact_phone_number:"099-353-8102",
            email:"bana24tomochi@yahoo.co.jp"
          },
          {
            first_name:"Go",
            last_name:"Sazuka",
            password:"$2b$10$s.gegcvvLRro8rxCLD/SeOmJ8.GhUOsH06zx2JIi6djAp2irYLKQK",
            adress:"Shikishimacho 1-14, Nemuro, Hokkaido, 087-0026",
            bank_reference:"Hokkaido Bank, 123-568-11-67",
            emergency_contact_person:"Sazuka Ue",
            emergency_contact_phone_number:"015-323-4448",
            email:"asasasa112233@gmail.com"
          },
          {
            first_name:"Hiroki",
            last_name:"Natsume",
            password:"$2b$10$d.rLzGV/4K4FMgJ2BtgH0OMPW0FRLMKfXoBGgNk8KLK5l1UZ.EPeq",
            adress:"Ho Hinomikomachi, Hakusan, Ishikawa, 920-2153",
            bank_reference:"Hokuriku Bank, 010-033-01-97",
            emergency_contact_person:"Natsume Satoshi",
            emergency_contact_phone_number:"076-272-1811",
            email:"hnatsumehironatsu@ezweb.ne.jp"
          }
      ]);
    });
  };
