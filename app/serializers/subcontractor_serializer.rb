class SubcontractorSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :trade, :phone_number
 
  has_many :contacts
end
