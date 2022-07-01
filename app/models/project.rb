class Project < ApplicationRecord
  belongs_to :company
  has_one :budget, dependent: :destroy
  has_many :user_projects, dependent: :destroy
  has_many :users, through: :user_projects

  validates :name, presence: true, uniqueness: { scope: :company }
  validates :location, presense: true
  validates :size, presence: true, numericality: { only_integer: true}

  validate :construction_types
  validate :construction_sectors

  def construction_types
    types = [/New Construction|Remodel|Interior Renovation|Exterior Renovation/]
    errors.add(:type, "invalid, please select type from the list") unless types.any?{|t| t.match?(type)}
  end

  def construction_sectors
    types = [/Restaurant|Medical|Office|School|Multi-Family|Residential/]
    errors.add(:type, "invalid, please select type from the list") unless types.any?{|t| t.match?(type)}
  end


end
