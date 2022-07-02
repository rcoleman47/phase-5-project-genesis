class ChangeProjectTypes < ActiveRecord::Migration[7.0]
  def change
    rename_column :projects, :type, :classification
  end
end
