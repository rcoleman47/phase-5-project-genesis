class User < ApplicationRecord
  has_secure_password

  belongs_to :company
  has_many :user_projects, dependent: :destroy
  has_many :projects, through: :user_projects
  

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
  validates :roll, presence: true

  validate :roll_types


  def roll_types
    rolls = [/Executive|Project Manager|Estimator|Superintendent/]
    errors.add(:roll, "Please select valid roll.") unless rolls.any?{|r| r.match?(roll)}
  end

end
