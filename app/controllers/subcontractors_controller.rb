class SubcontractorsController < ApplicationController
  before_action :is_admin, only: [:create, :update, :destroy]

  def index
    render json: current_company.subcontractors
  rescue
    sign_in_error
  end

  def show
    render json: subcontractor
  end

  def create
    new_subcontractor = Subcontractor.create!(subcontractor_params)
    render json: new_subcontractor, status: 201
  end

  def update
    subcontractor.update!(subcontractor_params)
    render json: subcontractor, status: 202
  end

  def destroy
    subcontractor.destroy!
    head 204
  end


  private

  def subcontractor_params
    params.permit(:name, :address, :phone_number, :trade, :company_id)
  end

  def subcontractor
    Subcontractor.find(params[:id])
  end
end
