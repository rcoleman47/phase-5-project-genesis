class Project < ApplicationRecord
  belongs_to :company
  has_many :budget_items, dependent: :destroy
  has_many :user_projects, dependent: :destroy
  has_many :users, through: :user_projects
  has_many :bids, dependent: :destroy

  after_initialize :init

  validates :title, presence: true, uniqueness: { scope: :company }
  validates :location, presence: true
  validates :size, presence: true, numericality: { only_integer: true}
  validates :tax_rate, numericality: true

  validate :construction_classifications
  validate :construction_sectors
  validate :construction_phases

  def construction_classifications
    classifications = [/New Construction|Remodel|Interior Renovation|Exterior Renovation/]
    errors.add(:classification, "invalid, please select class from the list") unless classifications.any?{|c| c.match?(classification)}
  end

  def construction_sectors
    sectors = [/Restaurant|Medical|Office|School|Multi-Family|Residential/]
    errors.add(:sector, "invalid, please select type from the list") unless sectors.any?{|s| s.match?(sector)}
  end

  def construction_phases
    phases = [/Pre-Construction|Construction|Complete/]
    errors.add(:phase, "invalid, please select type from the list") unless phases.any?{|ph| ph.match?(phase)}
  end

  def self.create_from_collection(project_data, budget_items_data)
    project_data.each_with_index.map{|proj, i| Project.create!(proj).budget_items.create!(budget_items_data[i])}
  end

  def init
    self.tax_rate ||= (8.5).to_d
  end

  def total
    budget_items.all.map{|item| item.total}.sum
  end

end
