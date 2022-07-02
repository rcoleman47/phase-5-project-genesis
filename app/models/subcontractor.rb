class Subcontractor < ApplicationRecord
  belongs_to :company
  has_many :contacts, dependent: :destroy
  has_many :bids, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :company }
  validates :trade, presence: true
end
