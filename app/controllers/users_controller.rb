class UsersController < ApplicationController

  def index
    render json: User.all
  end

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


  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :cell_number, :roll, :admin, :company_id)
  end
end
