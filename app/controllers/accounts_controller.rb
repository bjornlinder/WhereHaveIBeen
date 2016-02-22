class AccountsController < Devise::RegistrationsController
  def after_sign_up_path_for(resource)
    '/apps'
  end
end
