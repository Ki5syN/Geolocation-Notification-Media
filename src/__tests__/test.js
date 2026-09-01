
import parseCoordinates from '../js/cheking'


const coordinateCases = [
    "51.50851, −0.12572",   
    "51.50851,−0.12572",    
    "[51.50851, −0.12572]"  
];

test.each(coordinateCases)('should correctly parse coordinate', (input) => {
    
    const response = parseCoordinates(input);    
    
    expect(response).toEqual({ 
        latitude: 51.50851, 
        longitude: -0.12572 
    });
});

