
class Timer {
    constructor(){
        this.timerInterval = null;
        this.totalSeconds = null        
    }

    startTimer() {   

    this.stopTimer(); 
    this.totalSeconds = 0;

    const timerElement = document.querySelector('.timer');
    
    this.timerInterval = setInterval(() => {
        this.totalSeconds++;
        
        const minutes = String(Math.floor(this.totalSeconds / 60)).padStart(2, '0');
        const seconds = String(this.totalSeconds % 60).padStart(2, '0');
       
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds}`;
        }
        }, 1000);
    }

    stopTimer() {
    clearInterval(this.timerInterval); 
    this.timerInterval = null;
    this.totalSeconds = null;
    }
}

export default new Timer 

    


    





