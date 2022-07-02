CostCode.destroy_all
Division.destroy_all



scraper = Scraper.new
divisions = scraper.create_divisions
cost_codes = scraper.cc_array

Division.create_from_collection(divisions, cost_codes)