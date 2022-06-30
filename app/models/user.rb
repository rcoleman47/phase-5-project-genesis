class User < ApplicationRecord
  has_secure_password

  belongs_to :company

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
  validates :roll, presence: true

  validate :roll_types


  def roll_types
    rolls = [/Project Manager|Estimator|Superintendent/]
    errors.add(:roll, "Please select valid roll.") unless rolls.any?{|r| r.match?(roll)}
  end

end
