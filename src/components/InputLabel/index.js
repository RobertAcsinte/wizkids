import "./InputLabel.css"

function InputLabel({labelName, ...rest}) {
  return (
    <div className="label-container">
      <label className="label-form">{labelName}</label>
      <input className="input-form" {...rest} maxLength="30"/>
    </div>
  );
}

export default InputLabel;
