class BidSerializer < ActiveModel::Serializer
  attributes :id, :amount, :cost_code
  has_one :subcontractor
  has_one :project
end
