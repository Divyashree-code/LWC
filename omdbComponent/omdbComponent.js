import { track,LightningElement, api } from 'lwc';

export default class OmdbComponent extends LightningElement {
    @track data;
    @track error;

    fetchMovieName(event){
        console.log('the entered movie name'+this.template.querySelector('lightning-input').value);
        let endPoint =  "https://www.omdbapi.com/?s="+this.template.querySelector('lightning-input').value+"&apikey=696d01ae";
        fetch(
            endPoint, {
                method : "GET"
            }
          )
          .then(function(response) {
              return response.json();
            
          })
          .then(data => {
            
            if(data.Error){
                this.error = true;
            }
            else{
                this.error = false;
                this.data = data.Search;
            }
            
        });
    }
}