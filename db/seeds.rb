BudgetItem.destroy_all
Project.destroy_all
User.destroy_all
Company.destroy_all
CostCode.destroy_all
Division.destroy_all


# Company
c1 = Company.create!(name: 'Schema Construction', city: Faker::Address.city, state: Faker::Address.state, address: Faker::Address.street_address, phone_number: Faker::PhoneNumber.cell_phone, logo: 'https://dcassetcdn.com/design_img/3623917/746674/746674_19904371_3623917_a90eaa26_image.jpg')

# Users

u1 = User.create!(first_name: 'Ryan', last_name: 'Adams', email: 'ra@gmail.com' , password: '1234' , password_confirmation: '1234', cell_number: '(405) 555-1234' , role: 'Executive' , admin: true, company_id: c1.id)
u2 = User.create!(first_name: 'John', last_name: 'Doe', email: 'abc@gmail.com', password: '1234' , password_confirmation: '1234', cell_number: '(510) 456-7899', role: 'Superintendent', admin: false, company_id: c1.id)

# Projects
sectors = ['Restaurant', 'Medical', 'Office', 'School', 'Multi-Family', 'Residential']
classifications = ['New Construction', 'Remodel', 'Interior Renovation', 'Exterior Renovation']
phases = ['Pre-Construction', 'Construction', 'Complete']

project_data = []

10.times do 
  project_data_hash = {
    title: Faker::Company.name, 
    location: Faker::Address.street_address, 
    phase: phases.sample, 
    sector: sectors.sample, 
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


# Subcontractors & contacts
roles = ['Project Manager', 'Estimator', 'Executive', 'Superintendent']

sub_data = []

20.times do 
  sub_data_hash = {
    name: Faker::Company.name, 
    address: Faker::Address.street_address, 
    trade: Faker::Construction.subcontract_category,
    company_id: c1.id
  }
  sub_data << sub_data_hash
end

contact_data = []

4.times do 
  contact_data_hash = {
    name: Faker::Name.name , 
    cell_number: Faker::PhoneNumber.cell_phone, 
    email: Faker::Internet.email,
    role: roles.sample,
    company_id: c1.id
  }
  contact_data << contact_data_hash
end

Subcontractors.create_from_collection(sub_data, contact_data)

# Divisions and CostCodes
divisions = scraper.create_divisions
cost_codes = scraper.cc_array

Division.create_from_collection(divisions, cost_codes)