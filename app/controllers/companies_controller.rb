class CompaniesController < ApplicationController

  #Not needed for the app itself
  def index
    render json: Company.all
  end

  #Route /user_company
  def show
    current_company = Company.find_by(id: session[:company_id])
    if current_company
      render json: current_company, status: 200
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
