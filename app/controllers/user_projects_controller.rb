class UserProjectsController < ApplicationController

  def create
    user_project = UserProject.create!(user_project_params)
  end

  def update
    user_project.update!(user_project_params)
    render json: user_project, status: 202
  end

  def destroy
    user_project.destroy!
    head :no_content
  end

  private

  def user_project
    user_project = UserProject.find(params[:id])
  end

  def user_project_params
    params.permit(:project_id, :user_id)
  end
  
end
