const AlertValidate = (props) => {
  return (
    <>
      <div
        className="bg-red-300 opacity-100 text-sm text-red-700 font-bold my-3 px-3 rounded-md"
        role="alert"
      >
        {props.value}
      </div>
    </>
  );
};

export default AlertValidate;
