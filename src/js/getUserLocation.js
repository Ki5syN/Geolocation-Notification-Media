import { renderInfo } from './render' 
 
 export default async function getGeo (connectFunction) {
    if (!navigator.geolocation) {
        return await manualInput();     }

    try{
      const data = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { 
            enableHighAccuracy: true 
         });         
      });

      const { latitude, longitude } = data.coords;
      return `[${latitude} , ${longitude}]`;


    } catch{
        const manualGeo = await manualInput(connectFunction);
        return manualGeo;

    } 
    
}

async function manualInput(connectFunction){ 

    renderInfo ()    


    const data = await new Promise((resolve, reject) =>{ 
        connectFunction (resolve, reject);
    })

    return data

}

