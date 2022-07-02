class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :cell_number, :admin, :role, :company_id
  
end
