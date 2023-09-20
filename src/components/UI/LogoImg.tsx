import logo from "/assets/logo/Light.svg";

function LogoImg() {
  return (
    <div>
      <img
        src={logo}
        alt="logo-light"
        style={{ width: "140px", height: "60px" }}
      />
    </div>
  );
}

export default LogoImg;
