require 'rails_helper'

feature 'user signs up' do

  scenario 'specifying valid and required information' do
    visit root_path
    click_link "Sign up"
    fill_in "Email", with: "dragonburglar@gmail.com"
    fill_in 'user_password', with: "password"
    fill_in "Password confirmation", with: "password"
    click_on "Sign up"

    expect(page).to have_content("Welcome! You have signed up successfully.")
    expect(page).to have_content("Sign out")
  end

  scenario 'requested information is not specified' do
    visit root_path
    click_link "Sign up"
    click_on 'Sign up'

    expect(page).to have_content("can't be blank")
  end

  scenario 'signs up with previously assigned email' do
    visit root_path
    click_link "Sign up"
    user = FactoryGirl.create(:user)
    fill_in 'Email', with: user.email
    click_on 'Sign up'

    expect(page).to have_content('has already been taken')
  end

  scenario 'password confirmation does not match confirmation' do
    visit root_path
    click_link "Sign up"
    fill_in 'user_password', with: 'imapassword'
    fill_in 'Password confirmation', with: 'imnotapassword'
    click_on 'Sign up'

    expect(page).to have_content("doesn't match Password")
  end

end
