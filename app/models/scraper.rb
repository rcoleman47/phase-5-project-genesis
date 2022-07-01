require 'open-uri'
require 'net/http'
require 'nokogiri'
require 'json'
require 'byebug'


class Scraper

  URL = "https://support.procore.com/faq/what-are-procores-default-cost-codes"

  def get_data_array
  
    html = URI.open(URL)
    doc = Nokogiri::HTML(html)

    trow = doc.css('tr').text.split("\n").collect(&:strip).reject{|a| a.empty?}.drop(2)

    array_e = trow.values_at(* trow.each_index.select {|i| i.even?})

    values = trow.values_at(* trow.each_index.select {|i| i.odd?})

    keys = array_e.collect do |a|
      if a.length === 3 && a.include?('-')
        "Division " + a.chop
      elsif a === '16'
        "Division " + a
      else
        a.chop
      end
    end
   
    array = keys.zip values
  end

  def create_divisions
    divisions = get_data_array.select{|k, v| k.include?('Division')}

    divs = []

    divisions.map do |division|
      name = division.first
      description = division.last

      division_info = {
        name: name,
        description: description,
      }
      divs << division_info
    end
    divs
  end

  def create_cost_codes
    cost_codes = get_data_array.reject{|k, v| k.include?('Division')}

    codes = []

    cost_codes.map do |cc|
      name = cc.first
      description = cc.last

      cc_info = {
        name: name,
        description: description,
      }
      codes << cc_info
    end
    codes
  end


end

scrape = Scraper.new

# [0, 32, 87, 101, 110, 121, 129, 140, 151, 163, 189, 225, 235, 264, 274, 286, 295]