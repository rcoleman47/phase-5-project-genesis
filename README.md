# README

Welcome to the Genesis Project Estimator!

To get started run the following in your terminal:

  - bundle install
  - rails db:migrate
  - rails db:seed
  - rails s

In a seperate terminal window, run the following:
  - cd client
  - npm install
  - npm start


Now that both the servers are up and running, you can login to application with one of the users created from the seed data:

  * Schema Construction has fake company data for projects, employees and subcontractors. You can go in and make changes to this existing company with the following login information:

    * email: ra@gmail.com 
    * password: 1234
    * this is an executive account and therefore has access to all company projects not just projects assigned to the account by another executive.

    * email: abc@gmail.com
    * password: 1234
    * this is a non-executive account and therefore has access to only project assigned to the account by an executive within the company. 


Or you can register a new company and sign up with an executive account to manage your own construction company!

Please let me know what you think about this application and feel free to give feedback. This is one of my first apps and I am still working on cleaning up/optimizing.
