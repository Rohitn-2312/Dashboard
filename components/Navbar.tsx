import React from 'react';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <div style={{color: 'grey', fontSize:'12px' }}>
        Home { `>`} <span style={{ fontWeight: 'bold', color:"blue"}}>Dashboard V2</span>
      </div>
      <div style={styles.rightSection}>
        <div style={styles.searchWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search anything..."
            style={styles.input}
          />
        </div>
        <div style={styles.icons}>
          <FaBell style={styles.icon} />
          <FaUser style={styles.icon} />
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    flexWrap: 'wrap',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '200px',
    marginRight: '10px',
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    color: '#ccc',
  },
  input: {
    width: '100%',
    padding: '10px 10px 10px 30px', // Adjust padding to make space for the icon
    border: '1px solid #ccc',
    borderRadius: '10px',
    outline: '2px solid lightblue',
  backgroundColor:'#E4FBFF',

  },
  icon: {
    marginRight: '10px',
    color: '#ccc',
    fontSize: '20px', // Default icon size
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
  },
  '@media (max-width: 768px)': {
    navbar: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    rightSection: {
      width: '100%',
      justifyContent: 'space-between',
      marginTop: '10px',
    },
    searchWrapper: {
      width: '100%',
      maxWidth: '100%',
      marginRight: '0',
    },
    icons: {
      marginTop: '10px', // Add margin to separate icons from search bar
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: '18px', // Smaller icon size for medium screens
      marginRight: '8px',
    },
  },
  '@media (max-width: 480px)': {
    navbar: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    rightSection: {
      width: '100%',
      justifyContent: 'space-between',
      marginTop: '10px',
    },
    searchWrapper: {
      width: '100%',
      maxWidth: '100%',
      marginRight: '0',
    },
    icons: {
      marginTop: '10px', // Add margin to separate icons from search bar
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      fontSize: '16px', // Smaller icon size for small screens
      marginRight: '5px',
    },
  },
};

export default Navbar;