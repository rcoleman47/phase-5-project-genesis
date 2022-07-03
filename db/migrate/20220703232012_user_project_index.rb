class UserProjectIndex < ActiveRecord::Migration[7.0]
  def change
    add_index :user_projects, [:project_id, :user_id], unique: true
  end
end
