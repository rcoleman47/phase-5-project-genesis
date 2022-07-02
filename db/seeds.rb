c1 = Company.create!(name: 'Schema Construction', city: Faker::Address.city, state: Faker::Address.state, address: Faker::Address.street_address, phone_number: Faker::PhoneFaker::PhoneNumber.cell_phone, logo: 'https://dcassetcdn.com/design_img/3623917/746674/746674_19904371_3623917_a90eaa26_image.jpg')

sectors = ['Restaurant', 'Medical', 'Office', 'School', 'Multi-Family', 'Residential']
types = ['New Construction', 'Remodel', 'Interior Renovation', 'Exterior Renovation']
phases = ['Pre-Construction', 'Construction', 'Complete']

project_data = {
  title: Faker::University.name, 
  location: Faker::Address.street_address, 
  phase: phases.sample, sector: sectors.sample, 
  type: types.sample, 
  size: Faker::Number.number(digits: 4)}

scraper = Scraper.new

cost_codes_array = scraper.get_data_array.reject{|k, v| k.include?('Division')}.map{|a| a.join(" ")}

budget_items_values = []

15.times do 
  hash = {
    cost_code: cost_codes_array.sample,
    unit_quantity: '',
    unit: '',
    taxed: [true, false].sample,
    subcontracted: [true, false].sample,
    notes: '',
    }
  budget_items_values << hash
end



# # the below data has been created successfully

# CostCode.destroy_all
# Division.destroy_all

# scraper = Scraper.new
# divisions = scraper.create_divisions
# cost_codes = scraper.cc_array

# Division.create_from_collection(divisions, cost_codes)