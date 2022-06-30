class CompaniesController < ApplicationController

  def index
    render json: Company.all
  end

  def show
    current_company = Company.find_by(id: session[:company_id])
    if current_company
      render json: current_company
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
