export default function parseCoordinates(input) {   
    
    let clean = input.trim().replaceAll('[', '').replaceAll(']', '');
    
    clean = clean.replaceAll('−', '-');

    
    const parts = clean.split(',');

    if (parts.length !== 2) {
       throw new Error ('Координаты должны разделяться одной запятой');
               
    }

    
    const latitude = parseFloat(parts[0].trim());
    const longitude = parseFloat(parts[1].trim());
    
    if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error('Введенные данные не являются числами');
    }

    
    return { latitude, longitude };
}