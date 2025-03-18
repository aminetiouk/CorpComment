export default function FeedbackForm() {
  return (
    <form>
      <textarea id="feedback-textarea" spellCheck={false}></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p>{150}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  )
}
