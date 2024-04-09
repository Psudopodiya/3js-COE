import React, { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form data:", formValues);
      // api call
    }

  };

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="mb-4 rounded bg-white px-8 py-6 shadow-md">
        <div className="mb-6">
          <label className="py-4 text-lg text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              formErrors.email ? "border-red-500" : ""
            }`}
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <p className="text-xs text-red-500">{formErrors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="py-4 text-lg text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
              formErrors.password ? "border-red-500" : ""
            }`}
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && (
            <p className="text-xs text-red-500">{formErrors.password}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;