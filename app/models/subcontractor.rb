class Subcontractor < ApplicationRecord
  belongs_to :company
  has_many :contacts, dependent: :destroy
  has_many :bids, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :company }
  validates :trade, presence: true


  def self.create_from_collection(sub_data, contact_data)
    sub_data.map{|sub| Subcontractor.create!(sub).contacts.create!(contact_data)}
  end

end
