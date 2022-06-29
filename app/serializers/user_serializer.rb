class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest, :cell_number, :admin, :roll
  has_one :company
end
