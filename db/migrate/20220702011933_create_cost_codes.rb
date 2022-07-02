class CreateCostCodes < ActiveRecord::Migration[7.0]
  def change
    create_table :cost_codes do |t|
      t.string :number
      t.string :description
      t.references :division, null: false, foreign_key: true

      t.timestamps
    end
  end
end
