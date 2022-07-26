puts 'Seeding in progress...'

# BudgetItem.destroy_all
# Project.destroy_all
# User.destroy_all
# Contact.destroy_all
# Subcontractor.destroy_all
# Company.destroy_all
CostCode.destroy_all
Division.destroy_all


# # Company
# c1 = Company.create!(name: 'Schema Construction', city: Faker::Address.city, state: Faker::Address.state, address: Faker::Address.street_address, phone_number: Faker::PhoneNumber.cell_phone, logo: 'https://dcassetcdn.com/design_img/3623917/746674/746674_19904371_3623917_a90eaa26_image.jpg')

# Users

# u1 = User.create!(first_name: 'Ryan', last_name: 'Adams', email: 'ra@gmail.com' , password: '1234' , password_confirmation: '1234', cell_number: '(405) 555-1234' , role: 'Executive' , admin: true, company_id: c1.id)
# u2 = User.create!(first_name: 'John', last_name: 'Doe', email: 'abc@gmail.com', password: '1234' , password_confirmation: '1234', cell_number: '(510) 456-7899', role: 'Superintendent', admin: false, company_id: c1.id)


# Divisions and CostCodes
scraper = Scraper.new

divisions = scraper.create_divisions
cost_codes = scraper.cc_array

Division.create_from_collection(divisions, cost_codes)


# Projects
# sectors = ['Restaurant', 'Medical', 'Office', 'School', 'Multi-Family', 'Residential']
# classifications = ['New Construction', 'Remodel', 'Interior Renovation', 'Exterior Renovation']
# phases = ['Pre-Construction', 'Construction', 'Complete']

# project_data = []

# 30.times do 
#   project_data_hash = {
#     title: Faker::Company.name, 
#     location: Faker::Address.street_address, 
#     phase: phases.sample, 
#     sector: sectors.sample, 
#     classification: classifications.sample, 
#     size: Faker::Number.number(4).to_i,
#     company_id: c1.id
#   }
#   project_data << project_data_hash
# end


# # BudgetItems
# divisions = Division.all

# budget_items_data = Array.new(30){Array.new(25){|a| a = {
#   division: divisions.sample.number,
#   cost_code: divisions.sample.cost_codes.sample.description,
#   unit_quantity: 1,
#   unit: 'ls',
#   unit_cost: Faker::Number.number(5).to_i,
#   taxed: [true, false].sample,
#   subcontracted: [true, false].sample,
#   notes: '',
# }}}


# Project.create_from_collection(project_data, budget_items_data)


# # Subcontractors & contacts
# roles = ['Project Manager', 'Estimator', 'Executive', 'Superintendent']

# sub_data = []

# 15.times do 
#   sub_data_hash = {
#     name: Faker::Company.name,
#     phone_number: Faker::PhoneNumber.cell_phone,
#     address: Faker::Address.street_address, 
#     trade: Faker::Construction.subcontract_category,
#     company_id: c1.id
#   }
#   sub_data << sub_data_hash
# end


# contact_data = Array.new(15){Array.new(4){|a| a = {
#   name: Faker::Name.name, 
#   cell_number: Faker::PhoneNumber.cell_phone, 
#   email: Faker::Internet.email,
#   role: roles.sample,
# }}}

# Subcontractor.create_from_collection(sub_data, contact_data)

puts "Seeding completed successfully!"

# ActiveRecord::Base.connection.tables.each do |t|
#   ActiveRecord::Base.connection.reset_pk_sequence!(t)
# end

