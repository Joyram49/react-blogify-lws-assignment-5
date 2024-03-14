export default function Tags({ tags }) {
  const temp = tags.split(",");

  return (
    <ul className='tags'>
      {temp.map((tag, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: tag }}></li>
      ))}
    </ul>
  );
}
