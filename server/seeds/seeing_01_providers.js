exports.seed = function(knex) {
    return knex('providers').del()
    .then(function () {
      return knex('providers').insert([
          {
            first_name:"Miori",
            last_name:"Suga",
            password:"konnyaku92",
            adress:"Higashichikuma District, Omi, Hi, Nagano, 399-7702",
            bank_reference:"Shinsei Bank, 540-6981117",
            emergency_contact_person:"Suga Sohta",
            emergency_contact_phone_number:"026-367-2828"
          },
          {
            first_name:"Toshio",
            last_name:"Sagawara",
            password:"2218tianjin",
            adress:"3882 Yasuda, Agano, Niigata, 959-2221",
            bank_reference:"SMBC, 211-0227783",
            emergency_contact_person:"Masuda Ryoko",
            emergency_contact_phone_number:"025-262-6969"
          },
          {
            first_name:"Tomoko",
            last_name:"Saito",
            password:"TomoUmeIchiSan",
            adress:"Minamisatsuma, Kasedahigashihoncho 12-2, Kagoshima, 897-0031",
            bank_reference:"SMBC, 211-4505051",
            emergency_contact_person:"Saito Kenji",
            emergency_contact_phone_number:"099-353-8102"
          },
          {
            first_name:"Go",
            last_name:"Sazuka",
            password:"GOGOKareMiso",
            adress:"Shikishimacho 1-14, Nemuro, Hokkaido, 087-0026",
            bank_reference:"Hokkaido Bank, 123-568-11-67",
            emergency_contact_person:"Sazuka Ue",
            emergency_contact_phone_number:"015-323-4448"
          },
          {
            first_name:"Hiroki",
            last_name:"Natsume",
            password:"HiroNatsu3131",
            adress:"Ho Hinomikomachi, Hakusan, Ishikawa, 920-2153",
            bank_reference:"Hokuriku Bank, 010-033-01-97",
            emergency_contact_person:"Natsume Satoshi",
            emergency_contact_phone_number:"076-272-1811"
          }
      ]);
    });
  };
