class SessionController < ApplicationController

  def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:current_user] = user.id
      render json: :user
    else
      render json: { error: "Invalid Username and/or Username" },  status: :unauthorized
    end
  end


  def logout
    session.delete :current_user
    render json: { message: "You've been logged out successfully" }
  end

end
