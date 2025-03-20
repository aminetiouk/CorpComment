import { BiSolidUpArrow } from 'react-icons/bi';

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      <li className="feedback">
        <button>
          <BiSolidUpArrow />
          <span>593</span>
        </button>
        <div>
          <p>B</p>
        </div>
        <div>
          <p>Amine</p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
            qui repellendus error repellat reiciendis enim amet odio mollitia,
            temporibus iusto.
          </p>
        </div>
        <p>4d</p>
      </li>
    </ol>
  );
}
