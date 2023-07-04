/* eslint-disable react/prop-types */
export default function StartScreen(props) {
  function handleClick() {
    props.setShowStartScreen();
  }

  return (
    <div className="start-screen-container">
      <h1 className="title">Quizzical</h1>
      <p className="start-screen-details">Test your knowledge</p>
      <button className="btn start-screen-button" onClick={handleClick}>
        Start quiz
      </button>
    </div>
  );
}
