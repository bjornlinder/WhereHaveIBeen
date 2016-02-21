module AuthenticationHelper

  def sign_in_as(user)
    visit root_path
    click_link 'Log in'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_on 'Log in'
  end

end
