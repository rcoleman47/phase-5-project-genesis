class Division < ApplicationRecord
  has_many :cost_codes

  validates :number, presence: true, uniqueness: true
  validates :title, presence: true, uniqueness: true
  
end
