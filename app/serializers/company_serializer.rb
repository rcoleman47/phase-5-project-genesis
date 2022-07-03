class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :address, :phone_number, :logo

  has_many :projects
  
end
