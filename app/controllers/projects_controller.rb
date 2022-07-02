class ProjectsController < ApplicationController

  def index
    projects = Project.all
    render json: projects
  end

  def show
    render json: project
  end

  def create
    new_project = Project.create!(project_params)
    render json: new_project, status: 201
  end

  def update
    project.update!(project_params)
    render json: project, status: 202
  end

  def destroy
    project.destroy!
    head 204
  end


  private

  def project_params
    params.permit(:title, :location, :phase, :sector, :classification, :size, :company_id)
  end

  def project
    Project.find(params[:id])
  end
end
