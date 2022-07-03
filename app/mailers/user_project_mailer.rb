class UserProjectMailer < ApplicationMailer
  default from: ENV['GMAIL_USERNAME']


  def user_project_email
    @user = params[:user]
    @project = params[:project]
    mail(to: @user.email, subject: "You've been added to the #{@project.title} Project")
  end

end
