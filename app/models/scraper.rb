require 'open-uri'
require 'net/http'
require 'nokogiri'
require 'byebug'


class Scraper
  ARRAY = [1..31, 33..86, 88..100, 102..109, 111..120, 122..128, 130..139, 141..150, 152..162, 164..188, 190..224, 226..234, 236..263, 265..273, 275..285, 287..294, 296..299]

  URL = "https://support.procore.com/faq/what-are-procores-default-cost-codes"

  def get_data_array
  
    html = URI.open(URL)
    doc = Nokogiri::HTML(html)

    cc_data = doc.css('tr').text.split("\n").collect(&:strip).reject{|a| a.empty?}.drop(2)

    key_data = cc_data.values_at(* cc_data.each_index.select {|i| i.even?})

    values = cc_data.values_at(* cc_data.each_index.select {|i| i.odd?})

    keys = key_data.collect do |a|
      if a.length === 3 && a.include?('-')
        "Division " + a.chop
      elsif a.length === 12
        a.chop
      elsif a === '16'
        "Division " + a
      else
        a
      end
    end

    array = keys.zip values
  end

  def create_divisions
    divisions = get_data_array.select{|k, v| k.include?('Division')}

    divs = []

    divisions.map do |division|
      number = division.first
      title = division.last

      division_info = {
        number: number,
        title: title,
      }
      divs << division_info
    end
    divs
  end

  def create_cost_codes
    codes = []
    desc_only = get_data_array.map{|a| a.join(" ")}
    
    desc_only.map do |cc|
      description = cc

      cc_info = {
        description: description,
      }
      codes << cc_info
    end
    codes

  end

  def cc_array
    ARRAY.map{|range| create_cost_codes[range]}
  end


end


# Index values for the division, cost codes for each division between each index
# indexes = keys.each_index.select{|x| keys[x].include?("Division")}

# [0, 32, 87, 101, 110, 121, 129, 140, 151, 163, 189, 225, 235, 264, 274, 286, 295]
