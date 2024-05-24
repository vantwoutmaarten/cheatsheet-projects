const Input = ({
  onChangeInput,
}: {
  onChangeInput: (data: number) => void;
}): JSX.Element => {
  return (
    <div>
      <input
        type="text"
        onChange={(e) => onChangeInput(Number(e.target.value))}
      />
    </div>
  );
};

export default Input;
