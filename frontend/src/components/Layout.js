import Sidebar from "./Sidebar";

function Layout({ children }) {

  return (

    <div style={{
      display: "flex",
      minHeight: "100vh"
    }}>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f4f7fb",
          overflowY: "auto"
        }}
      >

        {children}

      </div>

    </div>

  );

}

export default Layout;