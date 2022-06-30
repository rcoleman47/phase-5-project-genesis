class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :phase, :sector, :type, :size

end
