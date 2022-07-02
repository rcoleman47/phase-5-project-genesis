class CostCodesController < ApplicationController

  def index
    cost_codes = CostCode.all
    render json: cost_codes
  end

  def show
    render json: cost_code
  end

  def create
    new_cost_code = CostCode.create!(cost_code_params)
    render json: new_cost_code, status: 201
  end

  def update
    cost_code.update!(cost_code_params)
    render json: cost_code, status: 202
  end

  def destroy
    cost_code.destroy!
    head 204
  end


  private

  def cost_code_params
    params.permit(:description)
  end

  def cost_code
    CostCode.find(params[:id])
  end

end
