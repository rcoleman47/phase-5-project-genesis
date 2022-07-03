class AddTaxRateToProjects < ActiveRecord::Migration[7.0]
  def change
    add_column :projects, :tax_rate, :float
  end
end
