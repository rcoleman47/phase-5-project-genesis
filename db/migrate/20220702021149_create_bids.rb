class CreateBids < ActiveRecord::Migration[7.0]
  def change
    create_table :bids do |t|
      t.string :amount
      t.string :cost_code
      t.references :subcontractor, null: false, foreign_key: true
      t.references :project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
