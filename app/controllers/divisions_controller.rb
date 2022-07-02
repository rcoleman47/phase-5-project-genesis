class DivisionsController < ApplicationController

  def index
    divisions = Division.all
    render json: divisions
  end

  def show
    render json: division
  end

  def create
    new_division = Division.create!(division_params)
    render json: new_division, status: 201
  end

  def update
    division.update!(division_params)
    render json: division, status: 202
  end

  def destroy
    division.destroy!
    head 204
  end


  private

  def division_params
    params.permit(:number, :title)
  end

  def division
    Division.find(params[:id])
  end
  
end
