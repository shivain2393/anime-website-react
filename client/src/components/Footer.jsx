import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>This website is a personal project developed by <span className="highlights">Shivain</span> to showcase skills in web development and to provide a seamless anime browsing and streaming experience.</p>
          <p>All images and content belong to their respective copyright owners. This is a work in progress.</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/about"}>About</Link></li>
            <li><Link to={"/animes"}>Animes</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact</h2>
          <ul>
            <li>Email : <a href="mailto:shivain.sagar@gmail.com">shivain.sagar@gmail.com</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="github-link">
            <a className='github-logo' target='_blank' href="https://github.com/shivain2393">
              <img src='../public/github-white.png' alt="" />
            </a>
            <a target='_blank' href="https://github.com/shivain2393">Github</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 <span className='highlights'>Zoro</span>Watch. All Rights Reserved.</p>
      </div>
  
    </footer>

  )
}

export default Footer
