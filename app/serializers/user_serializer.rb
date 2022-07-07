class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :cell_number, :admin, :role, :company_id, :projects
  
  belongs_to :company

  def projects
    if object.role == 'Executive' && object.admin
      object.company.projects
    else
      object.projects
    end
  end
end
