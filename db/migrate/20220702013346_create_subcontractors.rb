class CreateSubcontractors < ActiveRecord::Migration[7.0]
  def change
    create_table :subcontractors do |t|
      t.string :name
      t.string :address
      t.string :phone_number
      t.string :trade
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
