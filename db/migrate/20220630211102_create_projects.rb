class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.string :location
      t.string :phase
      t.string :sector
      t.string :type
      t.integer :size
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
