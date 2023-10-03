const regex = {
  firstName: /^([A-Za-z]{2,29})[\s]{0,}?$/,
  lastName: /^([A-Za-z]{2,29})[\s]?([A-Za-z]{2,29})?[\s]{0,}?$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  address: /^[-\w ,()]{0,100}$/,
  businessName: /^.{5,100}$/,
  phone: /^\d{10,15}$/,
  zipCode: /^[0-9]{0,5}$/,
  description: /.{10,255}/,
  userName: /[a-z\d-]/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
};

export default regex;