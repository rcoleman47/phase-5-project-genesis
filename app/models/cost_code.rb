class CostCode < ApplicationRecord
  belongs_to :division

  validates :description, presence: true, uniqueness: { scope: :division}
  
end
