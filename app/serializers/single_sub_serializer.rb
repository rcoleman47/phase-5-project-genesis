class SingleSubSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :trade, :phone_number
end