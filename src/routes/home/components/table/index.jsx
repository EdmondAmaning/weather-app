import React, {Component}                        from 'react';


export default class Table extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            hours: [],
            location_1: '',
            location_2: '',
            location_1_data: [],
            location_2_data: [],
            series: []
        }
    }

    componentDidUpdate(){
        const _ = this.props
        let time = _.time
        if(time[0] === '0:00'){time = time.reverse()}

        if(time !== this.state.hours && time){
            this.setState({
                hours: time
            })
        } 
        
        if(_.data.location_1 !== this.state.location_1 && _.data.location_1){
            this.setState({
                location_1: _.data.location_1
            })
        }

        if(_.data.location_2 !== this.state.location_2 && _.data.location_2){
            this.setState({
                location_2: _.data.location_2
            })
        }

        if(_.data.series !== this.state.series && _.data.series){
            this.setState({
                series: _.data.series
            })
        }


    
        
    }

    render(){
        const _ = this.state
        return (
            <>
                <div className={"table table-responsive "+this.props.className}>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Time</td>
                                <td className={_.location_1?'':'d-none'}>{_.location_1}</td>
                                <td className={_.location_2?'':'d-none'}>{_.location_2}</td>
                                <td className={_.location_1 && _.location_2?'':'d-none'}>Difference</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                _.hours.map((data, i)=>{
                                    return (
                                        <tr key={i}>
                                            <td>{data}</td>
                                            <td className={_.location_1?'':'d-none'}>{(_.series.length > 0?_.series[0].data[((_.hours.length-1) - i)]:'')}</td>
                                            <td className={_.location_2?'':'d-none'}>{(_.series.length === 2?_.series[1].data[((_.hours.length-1) - i)]:'')}</td>
                                            <td className={_.location_1 && _.location_2?'':'d-none'}>{(_.series.length === 2?(_.series[0].data[((_.hours.length-1) - i)] - _.series[1].data[((_.hours.length-1) - i)]):'')}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}