class UserCompanySerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :cell_number, :role, :company_id

end
