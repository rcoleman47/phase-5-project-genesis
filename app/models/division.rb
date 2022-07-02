class Division < ApplicationRecord
  has_many :cost_codes, dependent: :destroy

  validates :number, presence: true, uniqueness: true
  validates :title, presence: true, uniqueness: true

  def self.create_from_collection(divisions, cost_codes)
    divisions.each_with_index.map{ |div, i| Division.create!(div).cost_codes.create!(cost_codes[i]) }

  end
  
end
