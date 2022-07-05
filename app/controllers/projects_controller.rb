class ProjectsController < ApplicationController
  before_action :is_admin, only: [:create, :update, :destroy]

  def index
    if current_user.role == 'Executive' && current_user.admin
      render json: current_user.company.projects
    else
      render json: current_user.projects
    end
  end

  def show
    render json: project, serializer: SingleProjectSerializerSerializer, status: 200
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
    params.permit(:title, :location, :phase, :sector, :classification, :size, :tax_rate, :company_id)
  end

  def project
    current_company.projects.find(params[:id])
  end
end
