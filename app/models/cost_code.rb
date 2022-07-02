class CostCode < ApplicationRecord
  belongs_to :division

  validates :number, presence: true, uniqueness: { scope: :division}
  validates :description, presence: true, uniqueness: { scope: :division}

  
end
