class CreateContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.string :cell_number
      t.string :email
      t.string :role
      t.references :subcontractor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
