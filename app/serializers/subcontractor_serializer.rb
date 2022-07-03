class SubcontractorSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone_number, :trade
 
  has_many :contacts
end
