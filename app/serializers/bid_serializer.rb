class BidSerializer < ActiveModel::Serializer
  attributes :id, :amount, :cost_code, :sub_name, :sub_trade, :sub_contacts
 
  def sub_name
    object.subcontractor.name
  end

  def sub_trade
    object.subcontractor.trade
  end

  def sub_contacts
    object.subcontractor.contacts
  end
end
