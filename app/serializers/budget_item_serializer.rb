class BudgetItemSerializer < ActiveModel::Serializer
  attributes :id, :cost_code, :unit_quantity, :unit, :unit_cost, :taxed, :subcontracted, :notes
  has_one :budget
end
