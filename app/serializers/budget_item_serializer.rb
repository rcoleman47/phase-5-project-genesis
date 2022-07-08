class BudgetItemSerializer < ActiveModel::Serializer
  attributes :id, :division, :cost_code, :unit_quantity, :unit, :unit_cost, :taxed, :subcontracted, :total, :notes


end
