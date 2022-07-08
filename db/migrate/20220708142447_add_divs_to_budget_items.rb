class AddDivsToBudgetItems < ActiveRecord::Migration[7.0]
  def change
    add_column :budget_items, :division, :string
  end
end
