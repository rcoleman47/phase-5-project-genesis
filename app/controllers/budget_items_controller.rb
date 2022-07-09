class BudgetItemsController < ApplicationController
  # Remove only during cleanup
  before_action :is_admin, only: [:create, :update, :destroy]

  # Delete during cleanup, not needed for production
  def index
    budget_items = BudgetItem.all
    render json: budget_items
  end

   # Delete during cleanup, not needed for production
  def show
    render json: budget_item
  end

  def create
    new_budget_item = BudgetItem.create!(budget_item_params)
    render json: new_budget_item.project, status: 201
  end

  def update
    budget_item.update!(budget_item_params)
    render json: budget_item, status: 202
  end

  def destroy
    budget_item.destroy!
    head 204
  end


  private

  def budget_item_params
    params.permit(:division, :cost_code, :unit_quantity, :unit_cost, :unit, :taxed, :subcontracted, :notes, :project_id)
  end

  def budget_item
    BudgetItem.find(params[:id])
  end

end
