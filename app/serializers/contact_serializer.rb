class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :cell_number, :email, :role
  
end
