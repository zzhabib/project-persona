// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';


const GET_BOOKS = gql`
  query GetBooks {
  books {
    title
  }
}
`;


function Books({ onBookSelected }) {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return(
    <select name='' onChange={onBookSelected}>
    {data.books.map((book) => (
 
      <option key={book.title} value={ book.author} >
        {book.title}
      </option>

    ))}
  </select>
  );
}


export default function App() {
  return (
    <div>
      <h2>My first Apollo app </h2>
      <br/>
      <Books />
    </div>
  );
}