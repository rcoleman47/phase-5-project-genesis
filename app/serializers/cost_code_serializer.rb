class CostCodeSerializer < ActiveModel::Serializer
  attributes :id, :description
  has_one :division
end
