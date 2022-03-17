exports.up = function(knex) {
    return knex.schema.table("users",table=>{
        table.string("subscription_plan");
    })
  };
  
  
  exports.down = function(knex) {
    return knex.schema.alterTable("users", table=>{
        table.dropColumn("subscription_plan");
    })
  };