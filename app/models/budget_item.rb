class BudgetItem < ApplicationRecord
  belongs_to :project

  after_initialize :init

  validates :cost_code, presence: true
  validates :unit_quantity, presence: true, numericality: true

  validate :unit_types

  def unit_types
    types = [/ls|ea|k|box|ft|sqft|yds/]
    errors.add(:unit, "invalid, please select type from the list") unless types.any?{|t| t.match?(unit)}
  end

  def init
    self.subcontracted ||= false
    self.taxed ||= false
  end

end
