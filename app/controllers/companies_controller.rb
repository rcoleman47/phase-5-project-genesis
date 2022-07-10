class CompaniesController < ApplicationController

  #Not needed for the app itself
  def index
    render json: Company.all
  end

  #Route /user_company
  def show
    if current_user
      render json: current_user.company, status: 200
    else
      render json: { error: "Not signed in"}, status: :not_found
    end  
  end

  def create
    company = Company.create!(company_params)
    render json: company, status: 201
  end


  private

  def company_params
    params.permit(:name, :city, :state, :address, :phone_number, :logo)
  end
  
end
