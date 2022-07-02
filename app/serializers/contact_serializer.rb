class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :cell_number, :email, :role
  has_one :subcontractor
end
