class RemoveCostCodeNumber < ActiveRecord::Migration[7.0]
  def change
    remove_column :cost_codes, :number
  end
end
