class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :phase, :sector, :classification, :size, :tax_rate, :total, :cost_per_sf

  has_many :budget_items

  def cost_per_sf
    (object.total / object.size).round
  end
end
