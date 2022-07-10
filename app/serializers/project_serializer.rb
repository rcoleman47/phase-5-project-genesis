class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :phase, :sector, :classification, :size, :total, :cost_per_sf, :tax_rate

  has_many :budget_items
  
  def cost_per_sf
    if object.budget_items.length > 0
      (object.total / object.size).round
    else
      0
    end
  end
  
end
