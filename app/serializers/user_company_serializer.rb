class UserCompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :cell_number, :role, :company_id

  def name
    "#{object.first_name} #{object.last_name}"
  end
end
