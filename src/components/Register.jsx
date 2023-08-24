import Logo from "../assets/logo-white.png";
import BackgroundImg from "../assets/background-img.jpg";
import { useFormik } from "formik";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: `url(${BackgroundImg})`,
  };

  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = `Required`;
    } else if (values.firstname.length > 15) {
      errors.firstname = `Must be less than 15 characters`;
    } else if (!/^[a-zA-Z\s]+$/.test(values.firstname)) {
      errors.firstname = `Must contain letters only`;
    }

    if (!validator.isEmpty(values.middlename)) {
      if (values.middlename.length > 15) {
        errors.middlename = `Must be less than 15 characters`;
      } else if (!validator.isAlpha(values.middlename)) {
        errors.middlename = `Must contain letters only`;
      }
    }

    if (!values.lastname) {
      errors.lastname = `Required`;
    } else if (values.lastname.length > 15) {
      errors.lastname = `Must be less than 15 characters`;
    } else if (!validator.isAlpha(values.lastname)) {
      errors.lastname = `Must contain letters only`;
    }

    if (!values.age) {
      errors.age = `Required`;
    } else if (values.age < 18) {
      errors.age = `Must be 18 years old and above`;
    } else if (!validator.isNumeric(values.age)) {
      errors.age = `Must contain numbers only`;
    }

    if (!values.address) {
      errors.address = `Required`;
    }

    if (!values.email) {
      errors.email = `Required`;
    } else if (!validator.isEmail(values.email)) {
      errors.email = `Invalid email`;
    }

    if (!values.password) {
      errors.password = `Required`;
    } else if (!validator.isStrongPassword(values.password)) {
      errors.password = `Password must be 8+ chars: Uppercase, lowercase, number, special.`;
    }

    if (!values.repassword) {
      errors.repassword = `Required`;
    } else if (values.password !== values.repassword) {
      errors.repassword = `Passwords do not match`;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      age: "",
      address: "",
      email: "",
      password: "",
      repassword: "",
    },
    validate: (values) => validate(values, formik.setErrors),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/users`,
          values
        );
        navigate(`../login`);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Handle 400 Bad Request error here
          console.log(error.response);
          //console.log("Error: Bad Request");

          if (error.response.data.index === 0) {
            // Update the error message for the email field
            formik.setErrors({
              ...formik.errors,
              email: "Email already exists",
            });
          }
        } else {
          // Handle other errors
          console.log("An error occurred:", error.message);
        }
      }
    },
  });

  const hasErrors = Object.values(formik.errors).some((error) => error !== "");

  return (
    <>
      <div
        className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat p-5"
        style={backgroundStyle}
      >
        <div className="md:min-w-[24%] scrollbar-style rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src={Logo} width="150" alt="life needs logo" />
              <h1 className="mb-2 text-3xl font-oswald">LifeNeeds Apparel</h1>
              <span className="text-gray-200">Create Account</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4 text-lg flex justify-center items-center flex-col">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div
                    className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
                    role="alert"
                  >
                    {formik.errors.firstname}
                  </div>
                ) : null}
              </div>

              <div className="mb-4 text-lg flex justify-center items-center flex-col">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="middlename"
                  id="middlename"
                  placeholder="Middle Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.middlename}
                />

                {formik.touched.middlename && formik.errors.middlename ? (
                  <div
                    className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
                    role="alert"
                  >
                    {formik.errors.middlename}
                  </div>
                ) : null}
              </div>

              <div className="mb-4 text-lg flex justify-center items-center flex-col">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                />

                {formik.touched.lastname && formik.errors.lastname ? (
                  <div
                    className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
                    role="alert"
                  >
                    {formik.errors.lastname}
                  </div>
                ) : null}
              </div>

              <div className="mb-4 text-lg flex justify-center items-center flex-col">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="age"
                  id="age"
                  placeholder="Age"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                />

                {formik.touched.age && formik.errors.age ? (
                  <div
                    className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
                    role="alert"
                  >
                    {formik.errors.age}
                  </div>
                ) : null}
              </div>

              <div className="mb-4 text-lg flex justify-center items-center flex-col">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />

                {formik.touched.address && formik.errors.address ? (
                  <div
                    className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
                    role="alert"
                  >
                    {formik.errors.address}
                  </div>
                ) : null}
              </div>

              <div className="mb-4 text-lg flex justify-center items-center flex-col">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div
                    className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
                    role="alert"
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="mb-4 text-lg flex justify-center items-center flex-col">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div
                    className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
                    role="alert"
                  >
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="mb-4 text-lg flex justify-center items-center flex-col">
                <input
                  className="rounded-xl border-none bg-gray-900 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  name="repassword"
                  id="repassword"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repassword}
                />
                {formik.touched.repassword && formik.errors.repassword ? (
                  <div
                    className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
                    role="alert"
                  >
                    {formik.errors.repassword}
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className={`${
                    hasErrors
                      ? `cursor-not-allowed bg-gray-400`
                      : `bg-gray-800 hover:bg-black`
                  }   rounded-3xl bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300`}
                  disabled={hasErrors}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
