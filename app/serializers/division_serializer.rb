class DivisionSerializer < ActiveModel::Serializer
  attributes :id, :number, :title

  has_many :cost_codes
end
