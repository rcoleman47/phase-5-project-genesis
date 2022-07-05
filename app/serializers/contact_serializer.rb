class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :office_number, :cell_number, :email, :role
  
  def office_number
    object.subcontractor.phone_number
  end
end
