class DropBudgetRemoveBudgetRefAddProjRef < ActiveRecord::Migration[7.0]
  def change
    remove_column :budget_items, :budget_id
    drop_table :budgets
    add_reference :budget_items, :project, foreign_key: true
  end
end
