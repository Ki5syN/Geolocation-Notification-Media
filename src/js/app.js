import storage  from './Storage';
import getGeo from './getUserLocation';
import recoder from './Recorder';
import { renderModal, renderTimeless } from './render'
import timer from './Timer'
import parseCoordinates from './cheking'

const widget = document.querySelector('.widget');
const textfield  = widget.querySelector('.form-input')




document.addEventListener('click', onClick);
textfield.addEventListener('keydown', getText);
//document.addEventListener('play',)
//document.addEventListener('pause',)


let activeModal = null; 
let geoResolve = null; 
let geoReject = null;



async function onClick (event) {    

    if (event.target.closest('.video')){ 

       const stream =  await recoder.start('video')
       if(!stream){
         alert('Не получен доступ к оборудованию')
         return;
       }

       activeModal = renderModal('video', stream)
       widget.append(activeModal)      
       timer.startTimer()
    }

    if(event.target.closest('.audio')){
        const stream =  await recoder.start('audio')
        activeModal = renderModal('audio', stream)
        widget.append(activeModal)
        timer.startTimer()
    }

    if(event.target.closest('.stop')){
        timer.stopTimer()
        recoder.stop()
        recoder.clearStream()

        if (activeModal) {
            activeModal.remove();
            activeModal = null;
        }
        await getObject('media')         
        
    }

    if(event.target.closest('.cancel')){        
         activeModal.remove()
    }

    

    if(event.target.closest('.cancel-geo')){
         geoReject(new Error('Отменено пользователем'));
         const infoDoxGeo  = document.querySelector('.info-box');
         infoDoxGeo.remove();
    }

     if(event.target.closest('.ok-geo')){    
        try{
            const infoDoxGeo  = document.querySelector('.info-box'); 
            const input = infoDoxGeo.querySelector('.info-input');
            const inputValue = input.value;


            parseCoordinates(inputValue)

            geoResolve(input.value);
            infoDoxGeo.remove();

        }catch(error){
            let errorLabel = document.querySelector('.error')
            const input = document.querySelector('.info-input')

            if (errorLabel) {
                errorLabel.textContent = error.message;
                errorLabel.style.display = 'block'; // Делаем надпись видимой
            }
            input.focus();
            return

        }
        
        
    }



}

async function getText (event) {  

    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); 
        getObject('text');      
    
        await getObject('text');    
        
    }   
    
    return;

}

async function getObject(typeData) {    

    try{
        let type ;
        let content ;

        if(typeData === 'text'){
            type = 'text'
            
            content = textfield.value;  
            
            if (!content) return; 
            
            textfield.value = '';
            textfield.style.height = 'auto';
        };

        if (typeData ==='media') {
            const recorderData = await recoder.getRecordData();
            type = recorderData.type;
            content = recorderData.content;
        }


        const geo = await getGeo(connection)  

        const data = {
        type: type, 
        media: content, 
        geo: geo, 
        date: new Date().toLocaleString()         
    } 

        renderTimeless(data)
        storage.savePost(data)


    }catch(err){
        console.log (`обьект не собран ${err}`)
    }   

    
}

function connection(resolve, reject){
    geoResolve = resolve;
    geoReject = reject;

}


