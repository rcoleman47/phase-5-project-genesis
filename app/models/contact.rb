class Contact < ApplicationRecord
  belongs_to :subcontractor

  validates :name, presence: true
  

  # create custom validations to add cell, email, roll if unknown
end
