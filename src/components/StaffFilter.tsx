/* eslint-disable react/react-in-jsx-scope */
export const StaffFilter = () => {
  const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("apply filters");
  };
  return (
    <form onSubmit={applyFilters}>
      <input type="submit" />
    </form>
  );
};
