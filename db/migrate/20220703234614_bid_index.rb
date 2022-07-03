class BidIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :bids, [:project_id, :subcontractor_id], unique: true
  end
end
