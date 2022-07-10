class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :cell_number, :admin, :role, :company_id, :company_logo

  def company_logo
    object.company.logo
  end
end
