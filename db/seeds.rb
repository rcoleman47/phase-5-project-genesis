BudgetItem.destroy_all
Project.destroy_all
Company.destroy_all
CostCode.destroy_all
Division.destroy_all


# Company
c1 = Company.create!(name: 'Schema Construction', city: Faker::Address.city, state: Faker::Address.state, address: Faker::Address.street_address, phone_number: Faker::PhoneNumber.cell_phone, logo: 'https://dcassetcdn.com/design_img/3623917/746674/746674_19904371_3623917_a90eaa26_image.jpg')


# Projects
sectors = ['Restaurant', 'Medical', 'Office', 'School', 'Multi-Family', 'Residential']
classifications = ['New Construction', 'Remodel', 'Interior Renovation', 'Exterior Renovation']
phases = ['Pre-Construction', 'Construction', 'Complete']

project_data = []

10.times do 
  project_data_hash = {
    title: Faker::Company.name, 
    location: Faker::Address.street_address, 
    phase: phases.sample, sector: sectors.sample, 
    classification: classifications.sample, 
    size: Faker::Number.number(4).to_i,
    company_id: c1.id
  }
  project_data << project_data_hash
end

# BudgetItems

scraper = Scraper.new
cost_codes_array = scraper.get_data_array.reject{|k, v| k.include?('Division')}.map{|a| a.join(" ")}

budget_items_data = []

20.times do
  budget_items_hash = {
    cost_code: cost_codes_array.sample,
    unit_quantity: 1,
    unit: 'ls',
    unit_cost: Faker::Number.number(4).to_i,
    taxed: [true, false].sample,
    subcontracted: [true, false].sample,
    notes: '',
  }
  budget_items_data << budget_items_hash
end


Project.create_from_collection(project_data, budget_items_data)


# Divisions and CostCodes
divisions = scraper.create_divisions
cost_codes = scraper.cc_array

Division.create_from_collection(divisions, cost_codes)