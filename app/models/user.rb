class User < ApplicationRecord
  has_secure_password

  belongs_to :company
  has_many :user_projects, dependent: :destroy
  has_many :projects, through: :user_projects
  

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, uniqueness: true, format: URI::MailTo::EMAIL_REGEXP
  validates :role, presence: true

  validate :role_types


  def role_types
    roles = [/Executive|Project Manager|Estimator|Superintendent/]
    errors.add(:role, "Please select valid role.") unless roles.any?{|r| r.match?(role)}
  end

end
