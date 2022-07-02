class Contact < ApplicationRecord
  belongs_to :subcontractor

  validates :name, presence: true

  # create custom validations to add cell, email, roll if unknown
  validate :role_types


  def role_types
    roles = [/Executive|Project Manager|Estimator|Superintendent/]
    errors.add(:role, "Please select valid role.") unless roles.any?{|r| r.match?(role)}
  end
end
