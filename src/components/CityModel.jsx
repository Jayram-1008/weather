import { useState, useContext, useRef, useEffect } from 'react';
import { CityContext } from '../context/CityContext';

function CityModel() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  const citiesOfIndia = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", 
    "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", 
    "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", 
    "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", 
    "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", 
    "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai"
  ];

  const cityContext = useContext(CityContext);

  const handleShow = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    cityContext.setCity(selectedCity); // Assuming setCity exists in CityContext
    handleClose();
  };

  // Function to close dialog on clicking outside
  const handleClickOutside = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      handleClose();
    }
  };

  // Attach event listener for clicks outside the dialog
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button onClick={handleShow} style={buttonStyle}>Change City</button>

      {isOpen && (
        <>
          {/* Backdrop for blur and click detection */}
          <div style={backdropStyle}></div>

          {/* Dialog box */}
          <dialog ref={dialogRef} open style={dialogStyles}>
            <h2 style={{color:'#000'}}>Select City</h2>
            <select onChange={handleCityChange} style={{ padding: '8px', marginBottom: '15px' }}>
              <option value="">Select a city</option>
              {citiesOfIndia.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>

            <div style={{ textAlign: 'right' }}>
              <button onClick={handleClose} style={{ padding: '8px 15px', background: '#ccc', border: 'none', borderRadius: '4px' }}>
                Close
              </button>
            </div>
          </dialog>
        </>
      )}
    </>
  );
}

export default CityModel;

// Inline CSS for styling
const dialogStyles = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  padding: '25px',
  maxWidth: '400px',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  zIndex: 11,  // Higher than the backdrop
  position: 'fixed',  // Fixed position
  top: '50%',         // Center vertically
  left: '50%',        // Center horizontally
  transform: 'translate(-50%, -50%)',  // Adjust based on the element size
  backgroundColor: '#fff',
};

const buttonStyle = {
  padding: '5px',
  border: 'none',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer'
};

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark semi-transparent overlay
  backdropFilter: 'blur(5px)',  // Blur effect
  zIndex: 10,  // Below the dialog
};
