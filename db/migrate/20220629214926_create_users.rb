class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :cell_number
      t.boolean :admin
      t.string :roll
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
