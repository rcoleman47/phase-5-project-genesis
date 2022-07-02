class Bid < ApplicationRecord
  belongs_to :subcontractor
  belongs_to :project

  validates :amount, presence: true, numbericality: { only_integer: true}
  validates :cost_codes, presence: true
end
