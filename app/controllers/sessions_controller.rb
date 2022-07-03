class SessionsController < ApplicationController

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:current_user] = user.id
      session[:current_company] = user.company_id
      render json: user
    else
      render json: { error: "Invalid Username and/or Password" },  status: :unauthorized
    end
  end


  def logout
    session.delete :current_user
    session.delete :company_id
    render json: { message: "You've been logged out successfully" }
  end

end
