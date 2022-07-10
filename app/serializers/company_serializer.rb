class CompanySerializer < ActiveModel::Serializer
  attributes :id, :name, :city_state, :address, :phone_number, :logo

  has_many :users, serializer: UserCompanySerializer
 
  def city_state
    "#{object.city}, #{object.state}"
  end

end
