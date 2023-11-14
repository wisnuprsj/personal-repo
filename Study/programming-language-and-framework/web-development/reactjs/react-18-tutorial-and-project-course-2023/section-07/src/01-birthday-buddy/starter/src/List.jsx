import People from "./People";

const List = ({ people }) => {
  return (
    <section>
      {people.map((person) => (
        <People key={person.key} {...person} />
      ))}
    </section>
  );
};

export default List;
