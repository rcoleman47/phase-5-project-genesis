class BudgetsController < ApplicationController

  def create
    budget = UserProject.create!(budget_params)
  end

  def destroy
    budget.destroy!
    head :no_content
  end

  private

  def budget
    budget = UserProject.find(params[:id])
  end

  def budget_params
    params.permit(:project_id)
  end

end
