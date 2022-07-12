class Bid < ApplicationRecord
  belongs_to :subcontractor
  belongs_to :project

  validates :amount, presence: true, numericality: { only_integer: true}
  validates :cost_code, presence: true
end
