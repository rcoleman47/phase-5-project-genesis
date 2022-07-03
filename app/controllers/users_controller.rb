class UsersController < ApplicationController
  before_action :is_admin, only: [:create, :update]

  def index
    company_users = current_user.company.users
    render json: company_users
  rescue
    sign_in_error
  end

  # Route /authorized_user
  def show
    current_user = User.find_by(id: session[:current_user])
    if current_user
      render json: current_user
    else
      render json: { error: "Not signed in"}, status: :not_found
    end  
  end

  def create
    user = User.create!(user_params)
    render json: user, status: 201
  end

  def update
    user = User.find(params[:id])
    user.update!(update_params)
    render json: user, status: 202
  end



  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :cell_number, :role, :admin, :company_id)
  end

  def update_params
    params.permit(:first_name, :last_name, :email, :cell_number, :role, :admin)
  end

end
