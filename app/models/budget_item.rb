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

  def total
    if taxed
     taxed_total = (unit_quantity * unit_cost) * (1 + (project.tax_rate / 100))
     taxed_total.round
    else
      unit_quantity * unit_cost
    end
  end

end
