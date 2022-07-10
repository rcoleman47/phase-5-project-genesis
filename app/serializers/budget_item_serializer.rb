class BudgetItemSerializer < ActiveModel::Serializer
  attributes :id, :division, :cost_code, :unit_quantity, :unit, :unit_cost, :taxed, :subcontracted, :total, :notes, :tax_rate

  def tax_rate
    object.project.tax_rate
  end
end
