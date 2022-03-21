exports.up = function(knex) {
    return knex.schema.table("inventory",table=>{
        table.boolean("pending_retrieval");
    })
  };
  
  
  exports.down = function(knex) {
    return knex.schema.alterTable("inventory", table=>{
        table.dropColumn("pending_retrieval");
    })
  };