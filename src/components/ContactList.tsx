const ContactList = () => {
  const renderActionBar = () => {
    return <div className="action-bar">Actions</div>;
  };

  return (
    <div className="container">
      <h1 className="page-title">Contact Manager</h1>
      {renderActionBar()}
    </div>
  );
};

export default ContactList;
