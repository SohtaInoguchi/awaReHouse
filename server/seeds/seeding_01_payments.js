exports.seed = function(knex) {
    return knex('payments').del()
    .then(function () {
      return knex('payments').insert([
          {
            covered_month:"January 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:7640
          },
          {
            covered_month:"February 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:11417
          },
          {
            covered_month:"March 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:10187
          },
          {
            covered_month:"April 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:6673
          },
          {
            covered_month:"May 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:2456
          },
          {
            covered_month:"June 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:8147
          },
          {
            covered_month:"July 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:4437
          },
          {
            covered_month:"August 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:14008
          },
          {
            covered_month:"September 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:11039
          },
          {
            covered_month:"October 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:2189
          },
          {
            covered_month:"November 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:13379
          },
          {
            covered_month:"December 2020",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:10078
          },
          {
            covered_month:"January 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:9525
          },
          {
            covered_month:"February 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:3411
          },
          {
            covered_month:"March 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:7034
          },
          {
            covered_month:"April 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:6041
          },
          {
            covered_month:"May 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:5411
          },
          {
            covered_month:"June 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:5973
          },
          {
            covered_month:"July 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:10436
          },
          {
            covered_month:"August 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:10058
          },
          {
            covered_month:"September 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:5567
          },
          {
            covered_month:"October 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:2021
          },
          {
            covered_month:"November 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:5796
          },
          {
            covered_month:"December 2021",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:13547
          },
          {
            covered_month:"January 2022",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:11449
          },
          {
            covered_month:"February 2022",
            provider_email:"mioriatsuga@gmail.com",
            amount_jpy:9157
          },
          {
            covered_month:"July 2021",
            provider_email:"sagachisama66@softbank.co.jp",
            amount_jpy:2006
          },
          {
            covered_month:"August 2021",
            provider_email:"sagachisama66@softbank.co.jp",
            amount_jpy:3124
          },
          {
            covered_month:"September 2021",
            provider_email:"sagachisama66@softbank.co.jp",
            amount_jpy:5558
          },
          {
            covered_month:"October 2021",
            provider_email:"sagachisama66@softbank.co.jp",
            amount_jpy:5042
          },
          {
            covered_month:"November 2021",
            provider_email:"sagachisama66@softbank.co.jp",
            amount_jpy:6008
          },
          {
            covered_month:"December 2021",
            provider_email:"sagachisama66@softbank.co.jp",
            amount_jpy:6045
          },
          {
            covered_month:"January 2022",
            provider_email:"sagachisama66@softbank.co.jp",
            amount_jpy:8027
          },
          {
            covered_month:"February 2022",
            provider_email:"sagachisama66@softbank.co.jp",
            amount_jpy:7411
          },
          {
            covered_month:"November 2021",
            provider_email:"bana24tomochi@yahoo.co.jp",
            amount_jpy:14937
          },
          {
            covered_month:"December 2021",
            provider_email:"bana24tomochi@yahoo.co.jp",
            amount_jpy:11094
          },
          {
            covered_month:"January 2022",
            provider_email:"bana24tomochi@yahoo.co.jp",
            amount_jpy:8025
          },
          {
            covered_month:"February 2022",
            provider_email:"bana24tomochi@yahoo.co.jp",
            amount_jpy:9067
          },
          {
            covered_month:"January 2022",
            provider_email:"asasasa112233@gmail.com",
            amount_jpy:1493
          },
          {
            covered_month:"February 2022",
            provider_email:"asasasa112233@gmail.com",
            amount_jpy:2111
          },
          {
            covered_month:"September 2021",
            provider_email:"hnatsumehironatsu@ezweb.ne.jp",
            amount_jpy:7655
          },
          {
            covered_month:"October 2021",
            provider_email:"hnatsumehironatsu@ezweb.ne.jp",
            amount_jpy:1022
          },
          {
            covered_month:"November 2021",
            provider_email:"hnatsumehironatsu@ezweb.ne.jp",
            amount_jpy:1495
          },
          {
            covered_month:"December 2021",
            provider_email:"hnatsumehironatsu@ezweb.ne.jp",
            amount_jpy:2213
          },
          {
            covered_month:"January 2022",
            provider_email:"hnatsumehironatsu@ezweb.ne.jp",
            amount_jpy:5611
          },
          {
            covered_month:"February 2022",
            provider_email:"hnatsumehironatsu@ezweb.ne.jp",
            amount_jpy:4287
          }
      ]);
    });
  };
