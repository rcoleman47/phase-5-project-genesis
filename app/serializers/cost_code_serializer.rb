class CostCodeSerializer < ActiveModel::Serializer
  attributes :id, :number, :description
  has_one :division
end
