class CreateBudgetItems < ActiveRecord::Migration[7.0]
  def change
    create_table :budget_items do |t|
      t.string :cost_code
      t.integer :unit_quantity
      t.string :unit
      t.integer :unit_cost
      t.boolean :taxed
      t.boolean :subcontracted
      t.string :notes
      t.references :budget, null: false, foreign_key: true

      t.timestamps
    end
  end
end
