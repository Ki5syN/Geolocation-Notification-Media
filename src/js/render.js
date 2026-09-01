export function renderTimeless(data) {

    const timeline = document.querySelector('.timeline')

    const {type, media, geo, date} = data

    const mediaBox = document.createElement('div')
    mediaBox.classList.add('timeline-item')

    const dateBox = document.createElement('span')
    dateBox.classList.add('date')
    dateBox.textContent = date;   
    mediaBox.append(dateBox)

    switch(type){

        case 'video':
            const video = document.createElement('video');
            video.classList.add('timeline-video');
            video.src = media
            video.controls = true; 
            mediaBox.append(video)
            break;

        case 'audio':
            const audio = document.createElement('audio');
            audio.classList.add('timeline-audio');
            audio.src = media
            audio.classList.add('audio');
            audio.controls = true; 
            mediaBox.append(audio)
            break;

        default:
            const text = document.createElement('span');
            text.classList.add('text');
            text.textContent = media
            mediaBox.append(text)
            break;          
                    
    }

    const geoeBox = document.createElement('span')
    geoeBox.classList.add('geo')
    geoeBox.textContent = `[${geo}]`  
    mediaBox.append(geoeBox)
    
    timeline.append(mediaBox)  
    
}

export function renderInfo(){
    const widget = document.querySelector('.widget')

    const infoBox = document.createElement('div');
    infoBox.classList.add('info-box');

    const infoHeader = document.createElement('h3');
    infoHeader.classList.add('info-header');
    infoHeader.textContent = 'Что-то пошло не так'
    
    const infoText = document.createElement('span');
    infoText.classList.add('info-text');
    infoText.textContent = 'К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, либо введите координаты вручную.'
   
    const infoInput = document.createElement('input');
    infoInput.classList.add('info-input');
    infoInput.id = 'coordinate';  

    const errorBox = document.createElement('span');
    errorBox.classList.add('error')

    const infoLabel = document.createElement('label');
    infoLabel.classList.add('info-label');
    infoLabel.htmlFor = 'coordinate';   
    infoLabel.textContent = 'Широта и долгота через запятую'

    const infoButtonBox = document.createElement('div')
    infoButtonBox.classList.add('info-btnbox')

    const infoButtonCancel = document.createElement('button');
    infoButtonCancel.classList.add('info-button', 'cancel-geo');     
    infoButtonCancel.textContent = 'Отмена';

    const infoButtonOk = document.createElement('button');
    infoButtonOk.classList.add('info-button', 'ok-geo');     
    infoButtonOk.textContent = 'OK';  

    infoButtonBox.append(infoButtonCancel,infoButtonOk);
    infoBox.append(infoHeader, infoText, infoLabel, infoInput, errorBox ,infoButtonBox)

    widget.append(infoBox)

}

export function renderModal (type , stream) {

    const modalBox = document.createElement('div');
    modalBox.classList.add('modal')

    const modalHeader = document.createElement('h5');
    modalHeader.classList.add('modal-header');
    modalHeader.textContent = 'Запись идет';

    modalBox.append(modalHeader)

    const modalButtonBox = document.createElement('div')
     modalButtonBox.classList.add('modal-btnbox')

    const modalButtonCancel = document.createElement('button');
    modalButtonCancel.classList.add('modal-button', 'cancel');     
    modalButtonCancel.textContent = 'X';

    const modalTimer = document.createElement('span')
    modalTimer.classList.add('timer')
    modalTimer.textContent = '00:00'

    const modalButtonStop = document.createElement('button');
    modalButtonStop.classList.add('modal-button', 'stop');     
    modalButtonStop.textContent = 'V';
    
    modalButtonBox.append(modalButtonCancel, modalTimer, modalButtonStop)

  if(type === 'video'){    
     const modalVideo = document.createElement('video');
     modalVideo.classList.add('modal-video');  
     modalVideo.autoplay = true;   
     modalVideo.muted = true;
     modalVideo.srcObject = stream;     
     modalBox.append(modalVideo);

  } else {
    const modalAudio = document.createElement('audio');
      modalAudio.classList.add('modal-audio');  
      modalAudio.autoplay = true;     
      modalAudio.src = stream; 
      modalBox.append(modalAudio);
  }

  modalBox.append(modalButtonBox)
  
  return modalBox

}
