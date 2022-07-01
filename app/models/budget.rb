class Budget < ApplicationRecord
  belongs_to :project
  has_many :budget_items, dependent: :destroy
  
end
