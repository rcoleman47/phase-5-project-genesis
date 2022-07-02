class ContactsController < ApplicationController

  def index
    contacts = Contact.all
    render json: contacts
  end

  def show
    render json: contact
  end

  def create
    new_contact = Contact.create!(contact_params)
    render json: new_contact, status: 201
  end

  def update
    contact.update!(contact_params)
    render json: contact, status: 202
  end

  def destroy
    contact.destroy!
    head 204
  end


  private

  def contact_params
    params.permit(:name, :cell_number, :email, :role, :subcontractor_id)
  end

  def contact
    Contact.find(params[:id])
  end
  
end
