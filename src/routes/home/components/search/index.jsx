import React, {Component}           from 'react';
import Chart                        from 'react-apexcharts'


import cities                       from '../../../../assets/dataset/city.list.json'
import Table                        from "../table"


const table = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-table fa-w-16 fa-3x"><path fill="currentColor" d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z" class=""></path></svg>'
const chart = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-line" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-chart-line fa-w-16 fa-3x"><path fill="currentColor" d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z" class=""></path></svg>'

export default class View extends Component {
  constructor(props){
    super(props);

    this.state = {
        time: [],
        location_1: '',
        location_2: '',
        location_1_res: [],
        location_2_res: [],
        cities: [],
        showChart: '',
        showTable: 'd-none',
        options: {
            chart: {
              type: 'line',
              toolbar: {
                show: false,
                tools: {
                  selection: false,
                  zoom: false,
                  zoomin: false,
                  zoomout: false,
                  pan: false,
                  reset: false,
                },
                autoSelected: 'zoom' 
              },
            },
            colors: ["#1a8fe3", "#d11149"],
            dataLabels: {
              enabled: false,
              formatter: function(val) {
                return val + " °C";
              },
            },
            stroke: {
              curve: 'smooth'
            },
            yaxis: {
              title: {
                text: "°C"
              },
            },
            xaxis: {
              type: 'text',
              categories: []
            },
            tooltip: {
              enabled: true,
              y: {
                formatter: function(val) {
                  return val + " °C";
                }
              }
            },
        },
        series: [],
    }
  }

  render() {
    const _ = this.state
        return (
            <>
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12">
                            <h1 className="text-center mb-4">Hourly Weather</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row my-4">
                        <div className="col-12 mx-auto col-lg-4">
                            <div className="form-group">
                                <input name="location_1" className="" placeholder="Location" value={_.location_1} onChange={(e)=>{this.hc(e, 'location_1')}} />
                            </div>
                            <div className={"location_results "+(_.location_1_res?'':'d-none')}>
                                {
                                    _.location_1_res.map((data, i)=>{
                                        return (
                                            <div key={i} onClick={()=>{this.selectCity(1, data)}}>{data.name}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-12 mx-auto col-lg-4">
                            <div className="form-group">
                                <input name="location_2" className="" placeholder="Location" value={_.location_2} onChange={(e)=>{this.hc(e, 'location_2')}} />
                            </div>
                            <div className={"location_results "+(_.location_2_res?'':'d-none')}>
                                {
                                    _.location_2_res.map((data, i)=>{
                                        return (
                                            <div key={i} onClick={()=>{this.selectCity(2, data)}}>{data.name}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center">
                                    <h3>
                                        <span>{_.location_1?_.location_1:''}</span><span>{_.location_1 && _.location_2?' vs ':''}</span><span>{_.location_2?_.location_2:''}</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-lg-8 mx-auto mb-4">
                                <span onClick={()=>{this.setState({showChart: '', showTable: 'd-none'})}} dangerouslySetInnerHTML={{__html: chart}}></span>
                                <span onClick={()=>{this.setState({showChart: 'd-none', showTable: ''})}} dangerouslySetInnerHTML={{__html: table}}></span>
                            </div>
                            <div className="col-12 col-lg-8 mx-auto">
                                <Chart className={_.showChart} options={this.state.options} series={this.state.series} type="line" width="100%" height={320} />
                                <Table className={_.showTable} data={_} time={_.time} />
                            </div>
                        </div>
                    </div>
                </div>
            </>  
        );
    }

    getWeather(a, name, lon, lat){
        const url = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?units=metric&lon='+lon+'&lat='+lat+'&dt='+(Math.floor(new Date()/1000))+'&appid='+process.env.KEY
        fetch(url, {
            method: 'GET',
            mode: 'cors'
         })
         .then(response => response.json())
         .then(data => {
            let temp = []
            let time = []
            for(let i=0;i< data.hourly.length;i++){
                temp.push(Math.floor(data.hourly[i].temp))
                time.push(new Date(data.hourly[i].dt * 1000).getHours()+':00')
            }
            let series = this.state.series
            series[(a-1)] = {name: name, data: temp}
            this.setState({
                series: series,
                options: {...this.state.options, xaxis: {categories: time}},
                time: time
            })
         })
         .catch((e) => {
            console.log(e)
         });
    }

    selectCity(a, data){
        this.setState({
            ['location_'+a]: data._name,
            ['location_'+a+'_res']: [], 
        }, 
        ()=>{
            this.getWeather(a, data._name, data.lon, data.lat)
        })
    }

    hc(e, a){
        if(a === 'location_2' && !this.state.location_1){return}
        this.setState({[a]: e.target.value})
        if(e.target.value.length < 2){this.setState({[a+'_res']: []});return}
        let res = []
        let count = 0
        for(let i=0;i<cities.length;i++){
            let name = cities[i].name.toLowerCase()
            if(
                name[0] === e.target.value[0].toLowerCase() && 
                name[1] === e.target.value[1].toLowerCase() && 
                name.indexOf(e.target.value.toLowerCase()) !== -1
            ){
                if(cities[i].state){
                    res.push({lon: cities[i].coord.lon, lat: cities[i].coord.lat, _name: cities[i].name, name: cities[i].name+' - '+cities[i].state+' ('+cities[i].country+')'})
                } else {
                    res.push({lon: cities[i].coord.lon, lat: cities[i].coord.lat, _name: cities[i].name, name: cities[i].name+' ('+cities[i].country+')'})
                }
                count++
            }
            if(count > 20){break}
        }
        this.setState({
            [a+'_res']: res
        })
    }

}
