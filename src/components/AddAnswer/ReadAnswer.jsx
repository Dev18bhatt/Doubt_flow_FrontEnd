import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
  const location = useLocation();
  const { title, body } = location.state || {};

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default DetailsPage;
