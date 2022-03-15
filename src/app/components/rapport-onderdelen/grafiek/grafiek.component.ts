import { Component, Input, OnInit } from '@angular/core';
import { Customization } from "../../../models/style.model";
import * as ApexCharts from 'apexcharts';
import { RapportOnderdeelComponent } from "../rapport-onderdeel/rapport-onderdeel.component";

@Component({
    selector   : 'app-grafiek',
    templateUrl: './grafiek.component.html',
    styleUrls  : ['./grafiek.component.scss']
})
export class GrafiekComponent extends RapportOnderdeelComponent implements OnInit {
    @Input() boundary!: HTMLElement;

    mainElement: string = 'grafiek-onderdeel';
    chart: any;
    chartOptions: any = {};

    ngOnInit(): void {
        this.chartOptions = {
            series: [
                {
                    name: "My-series",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                }
            ],
            chart : {
                height : '100%',
                type   : "line",
                width  : '100%',
                toolbar: {
                    show: false
                },
                zoom   : {
                    enabled: false
                },
            },
            title : {
                text: "Voortgang"
            },
            xaxis : {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
            }
        };
        this.chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);
        this.chart.render();

        this.setDefaultStyling([
                { key: Customization.width, value: '300', elementId: this.mainElement },
                { key: Customization.height, value: '250', elementId: this.mainElement },
                { key: Customization.type, value: 'line', elementId: this.mainElement },
            ]
        );
        this.styleService.getStyling().subscribe(styling => {
            this.appendStyling(styling, this.uuid);
            if (this.styleService.currentUuid === this.uuid) {
                styling.forEach(style => {
                    this.chart.updateSeries([{ [style.key.label]: style.value }]);
                })
            }
        })
    }
}
