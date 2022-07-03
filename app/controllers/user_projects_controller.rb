class UserProjectsController < ApplicationController

  def create
    if user_project = UserProject.create!(user_project_params)
      UserProjectMailer.with(user: User.find(user_project_params[:user_id]), project: Project.find(user_project_params[:project_id])).user_project_email.deliver_later
      render json: user_project, status: 200
    end
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
