require 'rails_helper'

feature 'user signs in' do

  scenario 'specifying valid and required information' do
    visit root_path
    user = FactoryGirl.create(:user)
    click_link "Log in"
    fill_in "Email", with: user.email
    fill_in "Password", with: user.password

    click_on "Log in"

    expect(page).to have_content("Signed in successfully.")
    expect(page).to have_content("Sign out")

  end

  scenario 'User entering wrong information is given error message and asked to enter correct info' do
    visit root_path
    user = FactoryGirl.create(:user)
    click_link "Log in"
    fill_in "Email", with: user.email
    fill_in "Password", with: "WRONG"

    click_on "Log in"
    expect(page).to_not have_content("Signed in successfully.")
    expect(page).to have_content("Invalid email or password.")

  end

end