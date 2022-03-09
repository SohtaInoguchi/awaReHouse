exports.up = function(knex) {
    return knex.schema.table("inventory",table=>{
        table.boolean("fragile");
        table.boolean("heavy");
    })
  };
  
  
  exports.down = function(knex) {
    return knex.schema.alterTable("inventory", table=>{
        table.dropColumn("fragile");
        table.dropColumn("heavy");
    })
  };