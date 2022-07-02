class CreateDivisions < ActiveRecord::Migration[7.0]
  def change
    create_table :divisions do |t|
      t.string :number
      t.string :title

      t.timestamps
    end
  end
end
