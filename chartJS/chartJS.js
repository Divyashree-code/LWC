import { track,LightningElement } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ChartJS extends LightningElement {
    @track isChartJsInitialized;
    @track typeofChart ;
    @track chart;
    @track config;

    renderedCallback() {
        
        this.isChartJsInitialized = true;

        if(this.typeofChart != undefined){
        this.config = {
            type: this.typeofChart,
            data: {
             labels: ["Year1","Year2","Year3","Year4","Year5"],
                datasets: [{            
                   label: "Data",
                   barPercentage: 0.5,
                   barThickness: 6,
                   maxBarThickness: 8,
                   minBarLength: 2,
                   data: [40, 0, 50, 70, 80],
                   backgroundColor: this.typeofChart== "bar"?"green": this.typeofChart == "line"?"grey":
                   [
                      "#2ecc71",
                      "#3498db",
                      "#95a5a6",
                      "#9b59b6",
                      "#f1c40f",
                      "#e74c3c",
                      "#34495e"
                    ],
                  },         
                ]
            },
            options: {
            }
        };


        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
         if(this.chart!=null){
            this.chart.destroy();
        }
            const ctx = this.template.querySelector('canvas.chartdisplay').getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
            this.chart.canvas.parentNode.style.height = '100%';
            this.chart.canvas.parentNode.style.width = '100%';
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading ChartJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
    }

    get options() {
      return [
          { label: 'Line', value: 'line' },
          { label: 'Bar', value: 'bar' },
          { label: 'Pie', value: 'pie' },
      ];
  }
  
  handleChange(event) {
      this.typeofChart = event.detail.value;
  }


}