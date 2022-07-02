class Project < ApplicationRecord
  belongs_to :company
  has_one :budget, dependent: :destroy
  has_many :user_projects, dependent: :destroy
  has_many :users, through: :user_projects
  has_many :bids, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :company }
  validates :location, presense: true
  validates :size, presence: true, numericality: { only_integer: true}

  validate :construction_types
  validate :construction_sectors
  validate :construction_phases

  def construction_types
    types = [/New Construction|Remodel|Interior Renovation|Exterior Renovation/]
    errors.add(:type, "invalid, please select type from the list") unless types.any?{|t| t.match?(type)}
  end

  def construction_sectors
    sectors = [/Restaurant|Medical|Office|School|Multi-Family|Residential/]
    errors.add(:sector, "invalid, please select type from the list") unless sectors.any?{|s| s.match?(sector)}
  end

  def construction_phases
    phases = [/Pre-Construction|Construction|Complete/]
    errors.add(:phase, "invalid, please select type from the list") unless phases.any?{|ph| ph.match?(phase)}
  end


end
