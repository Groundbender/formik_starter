import { useFormik } from "formik";
import * as Yup from "yup";
// const validate = (values) => {
//   const errors = {};

//   if (!values.name) {
//     errors.name = "Name is required";
//   } else if (values.name.length < 2) {
//     errors.name = "Name must be at least 2 characters";
//   }

//   if (!values.email) {
//     errors.email = "Email is required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   return errors;
// };

const Form = () => {
  const formik = useFormik({
    // собираем все аттрибуты name
    initialValues: {
      name: "",
      email: "",
      amount: 0,
      currency: "",
      text: "",
      terms: false,
    },
    // validate,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      amount: Yup.number()
        .required("Amount is required")
        .min(5, "Amount must be more than 5"),
      currency: Yup.string().required("Choose valute"),
      text: Yup.string().min(10, "Must be more than 10 symbols"),
      terms: Yup.boolean()
        .required("We need youк agreement")
        .oneOf([true], "We need your agreement"),
    }),
    onSubmit: (values) => console.log(JSON.stringify(values, null, 2)),
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Отправить пожертвование</h2>
      <label htmlFor="name">Ваше имя</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.name && formik.touched.name ? (
        <div style={{ color: "red", marginTop: "8px" }}>
          {formik.errors.name}
        </div>
      ) : null}
      <label htmlFor="email">Ваша почта</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.email && formik.touched.email ? (
        <div style={{ color: "red", marginTop: "8px" }}>
          {formik.errors.email}
        </div>
      ) : null}

      <label htmlFor="amount">Количество</label>
      <input
        id="amount"
        name="amount"
        type="number"
        value={formik.values.amount}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.amount && formik.touched.amount ? (
        <div style={{ color: "red", marginTop: "8px" }}>
          {formik.errors.amount}
        </div>
      ) : null}
      <label htmlFor="currency">Валюта</label>
      <select
        id="currency"
        name="currency"
        value={formik.values.currency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="">Выберите валюту</option>
        <option value="USD">USD</option>
        <option value="UAH">UAH</option>
        <option value="RUB">RUB</option>
      </select>
      {formik.errors.currency && formik.touched.currency ? (
        <div style={{ color: "red", marginTop: "8px" }}>
          {formik.errors.currency}
        </div>
      ) : null}
      <label htmlFor="text">Ваше сообщение</label>
      <textarea
        id="text"
        name="text"
        value={formik.values.text}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.errors.text && formik.touched.text ? (
        <div style={{ color: "red", marginTop: "8px" }}>
          {formik.errors.text}
        </div>
      ) : null}
      <label className="checkbox">
        <input
          name="terms"
          type="checkbox"
          value={formik.values.terms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        Соглашаетесь с политикой конфиденциальности?
      </label>
      {formik.errors.terms && formik.touched.terms ? (
        <div style={{ color: "red", marginTop: "8px" }}>
          {formik.errors.terms}
        </div>
      ) : null}
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Form;
