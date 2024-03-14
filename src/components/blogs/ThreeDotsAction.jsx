import threeDotsIcon from "../../assets/icons/3dots.svg";

export default function ThreeDotsAction({ onDotsClick }) {
  return (
    <div className='absolute right-0 top-0'>
      <button onClick={onDotsClick}>
        <img src={threeDotsIcon} alt='3dots of Action' />
      </button>
    </div>
  );
}
