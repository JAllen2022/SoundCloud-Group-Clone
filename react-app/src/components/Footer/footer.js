import "./Footer.css";

function Footer() {
  return (
    <div className="page-outer-container">

    <div className="footer">
      <h3 className="dev-info">Developer Information:</h3>
      <div className="contact-div">
        <div className="devs">
            <h4 className="dev-name">Roysa Peguero</h4>
          <div className="dev-ind-container">
            <button className="contact-btns">
              <a target="_blank" href="https://github.com/roysapeguero">
                <i class="fa-brands fa-github"></i>
              </a>
            </button>
            <button className="contact-btns">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/roysapeguero/"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </button>
          </div>
        </div>
        <div className="devs">
            <h4 className="dev-name">Jason Allen</h4>
          <div className="dev-ind-container">
            <button className="contact-btns">
              <a target="_blank" href="https://github.com/JAllen2022">
                <i class="fa-brands fa-github"></i>
              </a>
            </button>
            <button className="contact-btns">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/jasonallen715/"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </button>
          </div>
        </div>
        <div className="devs">
            <h4 className="dev-name">Lillyann Hidalgo</h4>
          <div className="dev-ind-container">
            <button className="contact-btns">
              <a target="_blank" href="https://github.com/lcelisse">
                <i class="fa-brands fa-github"></i>
              </a>
            </button>
            <button className="contact-btns">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/lillyann-h-55684b249/"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </button>
          </div>
        </div>
        <div className="devs">
            <h4 className="dev-name">Ryan Harden</h4>
          <div className="dev-ind-container">
            <button className="contact-btns">
              <a target="_blank" href="https://github.com/ryanharden">
                <i class="fa-brands fa-github"></i>
              </a>
            </button>
            <button className="contact-btns">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/ryanharden-dev"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Footer;
