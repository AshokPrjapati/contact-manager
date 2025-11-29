const Nav = () => {
  return (
    <div
      style={{
        background: "linear-gradient(258.07deg, #07CDBE 0%, #006EFA 91.28%)",
        color: "white",
        fontSize: "24px",
        fontWeight: "600",
        letterSpacing: "0.5px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <img width={138} height={32} src="/assets/logo.svg" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
