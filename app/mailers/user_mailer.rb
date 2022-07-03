class UserMailer < ApplicationMailer
  default from: "genesis.estimator@gmail.com"

  def welcome_email
    @user = params[:user]
    @company = params[:company]
    mail(to: @user.email, subject: "Welcome #{@user.name} to the #{@company.name}'s Genesis Estimator Profile")
  end

end
