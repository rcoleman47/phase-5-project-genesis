class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :phase, :sector, :classification, :size

end
