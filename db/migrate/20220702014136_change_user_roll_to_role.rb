class ChangeUserRollToRole < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :roll, :role
  end
end
