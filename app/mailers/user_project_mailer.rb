class UserProjectMailer < ApplicationMailer


  def user_project_email
    user = params[:user]
    project = params[:project]
    mail(to: user.email, subject: "You've been added to the #{project.title} Project")
  end

end
