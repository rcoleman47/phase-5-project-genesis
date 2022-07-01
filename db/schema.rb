# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_07_01_165518) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "budget_items", force: :cascade do |t|
    t.string "cost_code"
    t.integer "unit_quantity"
    t.string "unit"
    t.integer "unit_cost"
    t.boolean "taxed"
    t.boolean "subcontracted"
    t.string "notes"
    t.bigint "budget_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["budget_id"], name: "index_budget_items_on_budget_id"
  end

  create_table "budgets", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_budgets_on_project_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "city"
    t.string "state"
    t.string "address"
    t.string "phone_number"
    t.string "logo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "title"
    t.string "location"
    t.string "phase"
    t.string "sector"
    t.string "type"
    t.integer "size"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_projects_on_company_id"
  end

  create_table "user_projects", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_user_projects_on_project_id"
    t.index ["user_id"], name: "index_user_projects_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "cell_number"
    t.boolean "admin"
    t.string "roll"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_users_on_company_id"
  end

  add_foreign_key "budget_items", "budgets"
  add_foreign_key "budgets", "projects"
  add_foreign_key "projects", "companies"
  add_foreign_key "user_projects", "projects"
  add_foreign_key "user_projects", "users"
  add_foreign_key "users", "companies"
end
