export async function up(knex) {
  await knex.schema.createTable("orders", (table) => {
    table.string("id", 36).primary();
    table.string("user_id", 36).nullable();
    table.string("customer_name", 255).notNullable();
    table.string("customer_email", 255).notNullable();
    table.string("customer_phone", 64).notNullable();
    table.enum("fulfillment_type", ["pickup", "delivery"]).nullable();
    table.text("notes").nullable();
    table.integer("total_cents").notNullable();
    table.enum("status", ["pending", "confirmed", "cancelled"]).notNullable();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
    table.foreign("user_id").references("users.id").onDelete("SET NULL");
    table.index(["created_at"], "idx_orders_created_at");
    table.index(["status", "created_at"], "idx_orders_status_created_at");
    table.index(["user_id"], "idx_orders_user_id");
  });

  await knex.schema.createTable("order_items", (table) => {
    table.string("id", 36).primary();
    table.string("order_id", 36).notNullable();
    table.string("product_id", 36).notNullable();
    table.integer("quantity").notNullable();
    table.integer("unit_price_cents").notNullable();
    table.foreign("order_id").references("orders.id").onDelete("CASCADE");
    table.foreign("product_id").references("products.id");
    table.index(["order_id"], "idx_order_items_order_id");
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("order_items");
  await knex.schema.dropTableIfExists("orders");
}
