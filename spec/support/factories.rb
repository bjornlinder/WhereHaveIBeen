FactoryGirl.define do

  factory :user do
    sequence :email do |e|
      "email#{e}@email.com"
    end
    password 'password'
    password_confirmation 'password'
  end

end
