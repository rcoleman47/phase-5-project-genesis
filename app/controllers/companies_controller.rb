class CompaniesController < ApplicationController

  def index
    render json: Company.all
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
