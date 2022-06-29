class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone_number, :logo
end
