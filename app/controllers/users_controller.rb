class UsersController < ApplicationController
  before_action :is_admin, only: [:update, :destroy]

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
    if user = User.create!(user_params)
      UserMailer.with(user: user, company: Company.find(user.company_id)).welcome_email.deliver_later
      if user.company.users.count == 1
        session[:current_user] = user.id
        render json: user, status: 201
      else
        render json: user, status: 201
      end
    end
  end

  # modify to update self if not admin, admin can modify all
  def update
    user.update!(update_params)
    render json: user, status: 202
  end

  def destroy
    user.destroy!
    head 204
  end



  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :cell_number, :role, :admin, :company_id)
  end

  def update_params
    params.permit(:first_name, :last_name, :email, :cell_number, :role, :admin)
  end

  def user
    current_user.company.users.find(params[:id])
  end

end
